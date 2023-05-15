import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Flashcard from './components/Flashcard';

// Type question
type Question = {
  id: number;
  description: string;
  flashcard_back: string;
  flashcard_front: string;
  playlist: string;
  type: string;
  user: {
    avatar: string;
    name: string;
  };
};

const Following = () => {
  const [question, setQuestion] = React.useState<Question>({
    id: 1,
    description: '',
    flashcard_back: '',
    flashcard_front: '',
    playlist: '',
    type: '',
    user: {
      avatar: '',
      name: '',
    },
  });
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    loadQuestion();
  }, []);

  const loadQuestion = async () => {
    // setLoading(true);
    const response = await fetch(
      'https://cross-platform.rp.devfactory.com/following',
    );
    const json = await response.json();
    console.log(json);
    console.log(json.flashcard_back.length);
    setQuestion(json);
    setLoading(false);
  };

  const getQuestion = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <Flashcard
          id={question.id}
          description={question.description}
          flashcard_back={question.flashcard_back}
          flashcard_front={question.flashcard_front}
          playlist={question.playlist}
          type={question.type}
          user={question.user}
          loadQuestion={loadQuestion}
        />
      );
    }
  };

  return <View style={styles.container}>{getQuestion()}</View>;
};

export default Following;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
