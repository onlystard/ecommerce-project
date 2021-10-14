import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Card } from 'native-base';
import { SafeAreaView, StyleSheet, Image, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import i18n from 'i18n-js';
import moment from 'moment';

function CardCollection({
  name,
  total,
  staff,
  requestDateTime,
  storePhone,
  storeLogo,
  andress,
  grabPhone,
}) {
  return (
    <Card style={styles.card}>
      <View style={styles.image}>
        {storeLogo == '/images/logo/logo-dark.png' ? (
          <Image
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            source={{
              uri: storeLogo,
            }}
          />
        ) : (
          <Image
            style={styles.image1}
            source={{
              uri: storeLogo,
            }}
          />
        )}
      </View>
      <SafeAreaView>
        <Text numberOfLines={1} style={styles.title}>
          {name}
        </Text>
        <Text style={styles.address}>{storePhone}</Text>
        <Text style={styles.address}>{andress}</Text>
        <View style={styles.line}></View>
        <View>
          <Text numberOfLines={1} style={styles.receivable}>
            {i18n.t('FinCCP::CcpCollection.AmountNeedCollecting')}:{' '}
            <Text style={styles.money}>
              {total == undefined ? 0 : total.toLocaleString('en-US')} VNĐ
            </Text>
          </Text>

          <View style={styles.call}>
            <View style={{ width: '100%' }}>
              <Text numberOfLines={1} style={styles.receivable}>
                {i18n.t('FinCCP::CcpCollection.TimeToCollect')}:{' '}
                <Text style={styles.staff}>
                  {new Date(requestDateTime).toLocaleTimeString('vi-VN', {
                    hour: 'numeric',
                    minute: 'numeric',
                  })}{' '}
                  {moment(requestDateTime).format('DD/MM/yy')}
                </Text>
              </Text>
              <Text style={styles.receivable}>
                {i18n.t('FinCCP::CcpCollection.Payer')}: <Text style={styles.staff}>{staff}</Text>
              </Text>
              <Text style={styles.phone}>
                <Text style={styles.textPhone}>{i18n.t('FinCCP::CcpAccount:PhoneNumber')}</Text>:{' '}
                {grabPhone}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${grabPhone}`);
              }}
              style={{ marginBottom: 10, marginTop: 10 }}>
              <Image
                source={require('../../../assets/phone.png')}
                style={{ width: 40, height: 40 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Card>
  );
}

CardCollection.propTypes = {
  name: PropTypes.string,
  andress: PropTypes.string,
  total: PropTypes.number,
  staff: PropTypes.string,
  requestDateTime: PropTypes.string,
  storePhone: PropTypes.string,
};
export default CardCollection;
const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    maxHeight: '100%',
    width: '94%',
    alignItems: 'center',
    borderRadius: 10,
    shadowOffset: { width: 0, height: 1 },
    padding: 10,
    paddingHorizontal: 20,
  },
  call: { flexDirection: 'row', justifyContent: 'space-between', width: '88%' },
  staff: { fontWeight: 'bold', color: '#636363' },
  money: { color: '#2CD1F8', fontWeight: 'bold' },
  background: { position: 'absolute', left: 0, right: 0, top: 0, height: '100%' },
  phone: { fontWeight: 'bold', fontSize: 16, color: '#636363' },
  address: { opacity: 0.8, fontSize: 16, color: '#636369' },
  receivable: { fontSize: 16, color: '#636363' },
  contentFooter: { width: '80%' },
  titleFooter: { fontSize: 15, color: 'black', marginVertical: 20 },
  image: {
    width: 95,
    height: 95,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    marginLeft: 12,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },
  image1: {
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontWeight: 'bold',
    color: '#636363',
    overflow: 'hidden',
    fontSize: 18,
    textAlign: 'center',
  },
  line: { height: 1, backgroundColor: '#DDDDDD', marginVertical: 10 },
  textNomal: { fontWeight: 'normal', fontSize: 16 },
  imageIcon: { width: 25, height: 25, resizeMode: 'stretch' },
  textPhone: { fontWeight: 'normal', fontSize: 16, color: '#636363' },
});
