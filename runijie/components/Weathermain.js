import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, StatusBar } from 'react-native';
import SearchBar from './weathersearchBar';
import { haze, rainy, snow, sunny } from '../assets/backgroundImages/index';

export default function Weather({ weatherData, fetchWeatherData }) {

    const [backgroundImage, setBackgroundImage] = useState(null);

    const { weather,
            name,
            main: { temp, humidity ,pressure,feels_like},
            wind: { speed }, 
           
    } = weatherData;

    const [{ main }] = weather;

    useEffect(() => {
        setBackgroundImage(getBackgroundImg(main));
    }, [weatherData])

    function getBackgroundImg(weather) {
        if(weather === 'Snow') return snow
        if(weather === 'Clear') return sunny
        if(weather === 'Rain') return rainy
        if(weather === 'Haze') return haze
        return snow;   
    }

    
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='gray' />
            <ImageBackground 
                source={backgroundImage}
                style={styles.backgroundImg}
                resizeMode='cover'
            >
                <SearchBar fetchWeatherData={fetchWeatherData} />
                <View style={{alignItems: 'center' }}>
         <Text style={{ ...styles.headerText, fontWeight: 'bold', fontSize: 80 }}>{name}</Text>
          <Text style={{ ...styles.headerText, fontWeight: 'normal',fontSize: 50,color:'white'}}>{main}</Text>
          <Text style={{ ...styles.headerText,fontWeight: 'normal',color:'green',fontSize: 80 }}>{temp} °C</Text>
                </View>

                <View style={styles.table}>

                    <View style={styles.intable}>
                        <Text style={ styles.intableText }>Humidity</Text>
                        <Text style={ styles.intableText }>{humidity} %</Text>
                    </View>

                    <View style={styles.intable}>
                        <Text style={styles.intableText }>Wind Speed</Text>
                        <Text style={styles.intableText }>{speed} m/s</Text>
                    </View>
                    
                </View>

                <View style={styles.table}>

                    <View style={styles.intable}>
                        <Text style={styles.intableText}>Pressure:</Text>
                        <Text style={styles.intableText}>{pressure} Pa</Text>
                    </View>

                    <View style={styles.intable}>
                        <Text style={styles.intableText}>Feel Like</Text>
                        <Text style={styles.intableText}>{feels_like} °C</Text>
                    </View>
                    
                </View>
                    <View style={styles.table}>

                    <View style={styles.intable}>
                        <Text style={ styles.intableText }>Humidity</Text>
                        <Text style={ styles.intableText }></Text>
                    </View>

                </View>

             

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    backgroundImg: {
        flex: 1,
        width: Dimensions.get('screen').width
    },
    headerText: {
        fontSize: 40,
        marginTop: 10,
    },
    table: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        padding: 10
    },
  
    intable: {
        width: 150,
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center'
    },
    intableText:{
      fontSize: 22, 
      color: 'white',
    },
    

});
  