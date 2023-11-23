import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';

const FeedbackScreen = () => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [improvementAreas, setImprovementAreas] = useState([
    'Velocidad de la aplicación',
    'Diseño de la interfaz',
    'Funcionalidades faltantes',
  ]);
  const [openComment, setOpenComment] = useState('');

  const handleRatingChange = (value) => {
    // Aquí puedes agregar validación adicional si es necesario
    setRating(value);
  };

  const handleImprovementToggle = (area) => {
    const updatedAreas = [...improvementAreas];
    const index = updatedAreas.indexOf(area);

    if (index === -1) {
      updatedAreas.push(area);
    } else {
      updatedAreas.splice(index, 1);
    }

    setImprovementAreas(updatedAreas);
  };

  const handleOpenCommentChange = (text) => {
    setOpenComment(text);
  };

  const handleSubmit = () => {
    // Aquí puedes realizar acciones con los comentarios, como enviarlos a un servidor
    console.log('Rating:', rating);
    console.log('Selected Improvement Areas:', improvementAreas);
    console.log('Open Comment:', openComment);
    // Puedes agregar lógica adicional según tus necesidades
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Deja tus comentarios</Text>

      <Text style={styles.label}>Calificación:</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((value) => (
          <Button
            key={value}
            title={value.toString()}
            onPress={() => handleRatingChange(value)}
            color={rating === value ? '#2196F3' : '#888'}
          />
        ))}
      </View>

      <Text style={styles.label}>Áreas de mejora:</Text>
      <View style={styles.improvementAreasContainer}>
        {improvementAreas.map((area) => (
          <Button
            key={area}
            title={area}
            onPress={() => handleImprovementToggle(area)}
            color={improvementAreas.includes(area) ? '#2196F3' : '#888'}
          />
        ))}
      </View>

      <Text style={styles.label}>Comentarios abiertos:</Text>
      <TextInput
        style={styles.commentInput}
        multiline
        numberOfLines={4}
        placeholder="Expresa tus comentarios aquí..."
        value={openComment}
        onChangeText={handleOpenCommentChange}
      />

      <Button title="Enviar comentarios" onPress={handleSubmit} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16,
  },
  improvementAreasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
});

export default FeedbackScreen;
