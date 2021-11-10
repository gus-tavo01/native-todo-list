import React, { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import ListActions from '../redux/actions/list-actions';

import { Fab, AddIcon, SimpleGrid, ScrollView, Center, Text } from 'native-base';

import ListItem from '../components/ListItem';
import ModalContainer from '../components/modals/ModalContainer';
import AddListModal from '../components/modals/AddListModal';

import DatabaseService from '../services/database-service';
import { StyleSheet } from 'react-native';

import useAppToast from '../hooks/useAppToast';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const tasks = useSelector((state) => state.tasks);
  const toast = useAppToast();

  const [modalOpen, setModalOpen] = useState(false);

  const databaseService = useMemo(() => new DatabaseService(), []);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const result = await databaseService.getLists();
        dispatch(ListActions.setLists(result.payload));
      } catch (err) {
        toast.show('Cannot get lists');
      }
    };
    fetchLists();
  }, [tasks]);

  const handleOnAdd = async (newList) => {
    // eslint-disable-next-line curly
    if (newList.name.trim().length === 0) return;

    setModalOpen(false);

    let resultMessage;

    try {
      const { errorMessage, payload } = await databaseService.addList(newList);
      if (!errorMessage) {
        resultMessage = 'List added successfully';
        dispatch(ListActions.setLists(payload));
      } else {
        resultMessage = errorMessage;
      }
    } catch (err) {
      resultMessage = err.message;
    }

    toast.show(resultMessage);
  };

  const handleOnListPress = (id) => {
    navigation.navigate('Tasks', { listId: id });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {lists.items?.length === 0 && (
        <Center w={64} h={20} mt={10}>
          <Text fontSize={18}>You don't have any list yet</Text>
        </Center>
      )}

      <SimpleGrid columns={2} space={5}>
        {lists.items?.map((list) => (
          <ListItem
            id={list.id}
            key={list.id}
            name={list.name}
            tasks={list.tasks}
            onPress={handleOnListPress}
          />
        ))}
      </SimpleGrid>

      <ModalContainer isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <AddListModal onSubmit={handleOnAdd} onCancel={() => setModalOpen(false)} />
      </ModalContainer>

      <Fab
        onPress={() => setModalOpen(true)}
        position="absolute"
        icon={<AddIcon />}
        colorScheme="light"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 15,
  },
});

export default Home;
