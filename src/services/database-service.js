import SQLite from 'react-native-sqlite-storage';
import DbConfig from '../../config/localDb';
import ServiceResponse from '../../common/serviceResponse';

SQLite.enablePromise(false);

function mapRowsData(rows) {
  const resultSet = [];

  if (rows.length > 0) {
    for (let i = 0; i < rows.length; i++) {
      let item = rows.item(i);
      resultSet.push(item);
    }
  }

  return resultSet;
}

class DatabaseService {
  #connection = null;

  #executeQuery = (sql, parameters = []) => {
    return new Promise((resolve, reject) => {
      this.#connection.transaction(
        (tx) => {
          tx.executeSql(
            sql,
            parameters,
            (stm, resultSet) => {
              resolve(resultSet);
            },
            (err) => {
              reject(err);
            },
          );
        },
        (err) => {
          reject(err);
        },
      );
    });
  };

  #handleListTasks = async (list) => {
    const tasks = await this.getTasks(list.id);
    return { ...list, tasks: tasks.payload };
  };

  constructor() {
    // Open DB connection
    this.#connection = SQLite.openDatabase(DbConfig.dbName, DbConfig.version);

    // Setup TABLES
    this.#connection.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS lists (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(80)
        );`,
        [],
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(80),
          description VARCHAR (500),
          isDone INTEGER DEFAULT 0,
          listId INTEGER NOT NULL,
            FOREIGN KEY (listId) REFERENCES lists (id)
            ON DELETE CASCADE
        );`,
        [],
      );
    });
  }

  // #region Lists
  getLists = async () => {
    try {
      const dbResult = await this.#executeQuery('SELECT id, name FROM lists ORDER BY id DESC', []);
      const mappedRows = mapRowsData(dbResult.rows);

      const lists = await Promise.all(mappedRows.map((li) => this.#handleListTasks(li)));
      return ServiceResponse(lists);
    } catch (err) {
      return ServiceResponse(null, err.message);
    }
  };

  addList = async (list) => {
    try {
      const dbResponse = await this.#executeQuery('INSERT INTO lists (name) VALUES(?)', [
        list.name,
      ]);
      if (dbResponse.insertId) {
        const { payload: updatedLists } = await this.getLists();
        return ServiceResponse(updatedLists);
      }
      return ServiceResponse(null, 'List cannot be added');
    } catch (err) {
      return ServiceResponse(null, err.message);
    }
  };

  updateList = async (id, newList) => {
    try {
      const dbRes = await this.#executeQuery('UPDATE lists SET name = ? WHERE id = ?;', [
        newList.name,
        id,
      ]);

      if (dbRes.rowsAffected > 0) {
        const { payload } = await this.getLists();
        return ServiceResponse(payload);
      }

      return ServiceResponse(null, 'List cannot be updated');
    } catch (err) {
      return ServiceResponse(null, err.message);
    }
  };

  deleteList = async (id) => {
    try {
      const dbResponse = await this.#executeQuery('DELETE FROM lists WHERE id = ?', [id]);

      if (dbResponse.rowsAffected > 0) {
        const { payload } = await this.getLists();
        return ServiceResponse(payload);
      }
      return ServiceResponse(null, 'List cannot be deleted');
    } catch (err) {
      return ServiceResponse(null, err.message);
    }
  };
  // #endregion Lists

  // #region Tasks
  getTasks = async (listId) => {
    try {
      const dbResult = await this.#executeQuery(
        'SELECT id, name, description, isDone, listId FROM tasks WHERE listId = ?',
        [listId],
      );
      return ServiceResponse(mapRowsData(dbResult.rows));
    } catch (err) {
      return ServiceResponse(null, err.message);
    }
  };

  addTask = async (listId, task) => {
    try {
      const queryResult = await this.#executeQuery(
        'INSERT INTO tasks (name, listId, description) VALUES (?, ?, ?)',
        [task.name, listId, task.description],
      );
      if (queryResult.insertId) {
        const { payload } = await this.getTasks(listId);
        return ServiceResponse(payload);
      }
      return ServiceResponse(null, 'Task cannot be added');
    } catch (err) {
      return ServiceResponse(null, err.message);
    }
  };

  updateTask = async (listId, taskId, update) => {
    try {
      const dbRes = await this.#executeQuery(
        'UPDATE tasks SET name = ?, isDone = ? WHERE id = ?;',
        [update.name, update.isDone, taskId],
      );
      if (dbRes.rowsAffected > 0) {
        const { payload } = await this.getTasks(listId);
        return ServiceResponse(payload);
      }
      return ServiceResponse(null, 'Task cannot be updated');
    } catch (err) {
      return ServiceResponse(null, err.message);
    }
  };

  deleteTask = async (listId, taskId) => {
    try {
      const dbResponse = await this.#executeQuery('DELETE FROM tasks WHERE id = ?', [taskId]);
      if (dbResponse.rowsAffected > 0) {
        const { payload } = await this.getTasks(listId);
        return ServiceResponse(payload);
      }
      return ServiceResponse(null, 'Task cannot be deleted');
    } catch (err) {
      return ServiceResponse(null, err.message);
    }
  };
  // #endregion Tasks
}

export default DatabaseService;
