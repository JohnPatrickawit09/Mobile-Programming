import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FlatList } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useState } from 'react';

export default function TabOneScreen() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null); 

  
  const handleAddOrUpdateTodo = () => {
    if (editedTodo) {
      
      const updatedTodoList = todoList.map((item) =>
        item.id === editedTodo.id ? { ...item, title: todo } : item
      );
      setTodoList(updatedTodoList);
      setEditedTodo(null);
    } else {
    
      const newTodo = {
        id: Date.now().toString(),
        title: todo,
      };
      setTodoList([...todoList, newTodo]);
    }
    setTodo("");
  };

  
  const handleEditTodo = (todo) => {
    setEditedTodo(todo);
    setTodo(todo.title); 
  };

  const handleDeleteTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  const renderTodos = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: "#abd7cc",
          borderRadius: 6,
          paddingHorizontal: 12,
          paddingVertical: 12,
          marginBottom: 12,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.4,
          shadowRadius: 2,
        }}
      >
        <IconButton icon="pencil" iconColor="#fff" onPress={() => handleEditTodo(item)} />
        <IconButton
          icon="trash-can"
          iconColor="#fff"
          onPress={() => handleDeleteTodo(item.id)}
        />
        <Text
          style={{ color: "#fff", fontSize: 20, fontWeight: "800", flex: 1 }}
        >
          {item.title}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ marginHorizontal: 16 }}>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: "#5d8d85",
          borderRadius: 6,
          paddingVertical: 8,
          paddingHorizontal: 16,
        }}
        placeholder="Add a task"
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#000",
          borderRadius: 6,
          paddingVertical: 12,
          marginVertical: 34,
          alignItems: "center",
        }}
        onPress={handleAddOrUpdateTodo}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
          {editedTodo ? "Update" : "Add"}
        </Text>
      </TouchableOpacity>
      <FlatList data={todoList} renderItem={renderTodos} keyExtractor={(item) => item.id} />
    </View>
  );
}

const styles = StyleSheet.create({});
