/* eslint-disable react/prop-types */
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {
  GetDataPokemon,
  GetDataAfterNext,
  GetDataAfterPrevious,
  GetDataPokemonDetail,
} from '../../Config/Redux/Action';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import ScreenStatusBar from '../../Components/ScreenStatusBar';
import {PokeBall, BackgroundCatch} from '../../Assets';
import {HomeHeader} from '../../Components/Headers';
import Loading from '../../Components/Loading';
import {Color} from '../../utils/color';

const HomeScreen = ({navigation, route}) => {
  const focus = useIsFocused();
  const {userData} = route.params;
  const dispatch = useDispatch();
  const [halaman, setHalaman] = useState(1);

  const pokeData = useSelector(state => {
    return state.appData.pokemon;
  });

  const loading = useSelector(state => {
    return state.appData.isLoading;
  });

  const nextPokemon = useCallback(() => {
    if (pokeData.next === null) {
      console.log('Mentok');
    } else {
      dispatch(GetDataAfterNext(pokeData.next));
      setHalaman(halaman + 1);
    }
  }, [dispatch, halaman, pokeData.next]);

  const previousPokemon = useCallback(() => {
    if (pokeData.previous === null) {
      alert('Tidak ada halaman lagi');
    } else {
      dispatch(GetDataAfterPrevious(pokeData.previous));
      setHalaman(halaman - 1);
    }
  }, [dispatch, halaman, pokeData.previous]);

  useEffect(() => {
    dispatch(GetDataPokemon());
    console.log('loading', loading);
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[styles.pokemon, styles.shadowProp]}
      onPress={() =>
        dispatch(GetDataPokemonDetail(item.url, navigation, userData.id))
      }>
      <Image
        source={PokeBall}
        style={{width: 30, height: 30, marginHorizontal: 10}}
      />
      <Text
        style={{
          color: Color.BLACK,
          fontWeight: 'bold',
          fontSize: 15,
          textTransform: 'capitalize',
        }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  if (!loading) {
    return (
      <ImageBackground source={BackgroundCatch} style={styles.container}>
        <ScreenStatusBar status={focus} color={Color.SECOND_MAIN_COLOR} />
        <StatusBar backgroundColor={'#79c9f9'} />
        <HomeHeader navigation={navigation} userId={userData.id} />
        <FlatList
          numColumns={2}
          columnWrapperStyle={{flex: 1, justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={pokeData.results}
          renderItem={renderItem}
        />
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => previousPokemon()}
            style={[
              styles.btnPagination,
              {backgroundColor: Color.BUTTON_AUTH},
            ]}>
            <Text style={styles.btnText}>Previous</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 15,
              marginLeft: 13,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            Page {halaman}
          </Text>
          <TouchableOpacity
            onPress={() => nextPokemon()}
            style={[
              styles.btnPagination,
              {backgroundColor: Color.BUTTON_AUTH},
            ]}>
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  } else {
    return <Loading />;
  }
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f6f5',
    flex: 1,
    paddingHorizontal: 17,
    paddingBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  btnPagination: {
    width: 80,
    height: 40,
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  pokemon: {
    backgroundColor: Color.BACKGROUND_DETAIL,
    width: '45%',
    height: 50,
    marginTop: 10,
    flexDirection: 'row',
    padding: 7,
    alignItems: 'center',
    borderRadius: 5,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 3,
  },
});
