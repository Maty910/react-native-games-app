import React , { useState, useEffect} from 'react'
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native'
import Constants from 'expo-constants';

  const API_KEY = Constants.expoConfig?.extra?.apiKey;
  const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

export default function Index() {
  type Game = {
    id: number,
    name: string,
    background_image: string
  }

  const [count, setCount] = useState(0)
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json()
        setGames(data.results)
      } catch (error) {
        console.error('Error al obtener los juegos:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchGames()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Juegos + Contador 🔢</Text>
        
      <View style={styles.counterContainer}>
        <Text style={styles.counterLabel}>Contador:</Text>
        <Text style={styles.counter}>{count}</Text>
        <Button title="Incrementar contador" onPress={() => setCount(count + 1)} />
      </View>

      <Text style={styles.subtitle}>Juegos Populares</Text> {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={games}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.background_image }} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
            </View>
          )}
        />
      )} 
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 40,
    backgroundColor: '#473eab'
  },

  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    margin: 20, 
    textAlign: 'center',
    color: '#fff' 
  },

  counterContainer: {
    marginBottom: 20,
    alignItems: 'center',
    gap: 8,
  },

  counterLabel: { 
    fontSize: 18,
    fontWeight: '600',
    color: '#fff' 
  },
  counter: { fontSize: 32, 
    fontWeight: 'bold',
    color: '#fff' 
  },

  subtitle: { 
    fontSize: 20, 
    fontWeight: '600', 
    marginBottom: 10,
    color: '#fff' 
  },

  card: { 
    marginBottom: 20,
  },

  image: { 
    width: '100%', 
    height: 180, 
    borderRadius: 8,
  },

  name: { 
    marginTop: 8, 
    fontSize: 16,
    fontWeight: '600',
    color: '#fff'
  },

  button: { 
    padding: 10, 
    borderRadius: 5, 
    alignItems: 'center' 
  }
});

