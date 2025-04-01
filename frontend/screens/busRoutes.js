import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { List } from 'react-native-paper';

const busRoutes = [
  {
    routeNo: '1',
    driver: 'Laxma Reddy',
    mobile: '9948029392',
    stops:
      'Suraram 6:50 AM - Jeedimetla - Shapur - Chintal - IDPL - Balanagar X Road - Peeroz Guda - Boji Function Hall (Balanagar) - Bowenpally (CMR Function Hall) - Bapuji Nagar (Sarojini Pulla Reddy Hospital) - JBS - Sangeeth - College',
  },
  {
    routeNo: '2',
    driver: 'Ramachandraiah',
    mobile: '7731914909',
    stops:
      '7:05 AM - Mehdipatnam (Before Rythu Bazar) - Rathibowli - Raya Dharga - Gachibowli - Narsing Service Road - APPA Junction - TSPA - Tukkuguda - Kongara - College',
  },
  {
    routeNo: '3',
    driver: 'Khaleel',
    mobile: '9885026686',
    stops:
      'Indira Park 7:05 AM - TDP Office - Ashok Nagar X Road (Before Khaman) - RTC X Road Sandhya Theatre - Bus Bhavan - Ramnagar Gundu - Vidya Nagar - Shivam Road - Amberpet - Ramanthapur Bharat Petrol pump - Alkapuri - Rock Town - Kamineni - College',
  },
  {
    routeNo: '4',
    driver: 'Srisailam',
    mobile: '9010448820',
    stops:
      'Pedda Amberpet Checkpost 7:50 AM - Laxma Reddy Palem - Word & Deed - Injapur - College',
  },
  {
    routeNo: '5',
    driver: 'Sailu',
    mobile: '9553445749',
    stops:
      'Bollaram Railway Station 7:00 AM - Risala bazar - Macha Bollaram - Old Alwal IG Statue - Alwal Bus Stop - Lothukunta (China Bazar) - Lal Bazar - Thirumalagiri - Kharkhana (Adidas Showroom) - YMC - Street No.8 - College',
  },
  {
    routeNo: '6',
    driver: 'Vishnu',
    mobile: '9652451198',
    stops: 'Hastinapuram Signal 8:15 AM - Bongloor - College',
  },
  {
    routeNo: '7',
    driver: 'Madhukar Reddy',
    mobile: '9963220970',
    stops:
      'Vinayaka Nagar Bus Stop 7:25 AM - Safil Guda - Vani Nagar - Anutex - Malkajgiri - Mirjalguda - Thukaramgate - Mettuguda - College',
  },
  {
    routeNo: '8',
    driver: 'Venkateshwarlu',
    mobile: '7382805902',
    stops:
      'Mother Dairy 7:25 AM - DD Colony (Hotel Management) - Prashanth Nagar (Shivam Road) - SBI/Bakers Q (Shivam Road) - Sri Ramana Theatre - Amberpet Dargah - TV Studio - College',
  },
  {
    routeNo: '9',
    driver: 'Rama Krishna',
    mobile: '9700123734',
    stops:
      'Vijaya Laxmi Theatre 8:00 AM - Chintalkunta - Vishnu Theatre - Panama - Prashanth Nagar Reliance Fresh - RED Tank - Area Hospital - College',
  },
  {
    routeNo: '10',
    driver: 'Srinivas',
    mobile: '9951108428',
    stops:
      'Nalgonda X Road (Yashoda Hospital) 7:35 AM - Chanchal Guda Jail - Madannapet - Dhobighat - Vinayak Nagar - Bharat Garden - Champapet - Sama Narasimha Reddy Garden - Swagath Hotel - College',
  },
  {
    routeNo: '11',
    driver: 'Chilukaiah',
    mobile: '6300290447',
    stops:
      "Area Hospital (Vanasthalipuram) 08:15 AM - NGO's Bus Stop - BN Reddy (More) - College",
  },
  {
    routeNo: '12',
    driver: 'Narsimha',
    mobile: '9618125272',
    stops: 'Yamjal 8:20 AM - Manneguda X Road - Manneguda RTO office - College',
  },
  {
    routeNo: '13',
    driver: 'Yadagiri Reddy',
    mobile: '8019901377',
    stops:
      'Satya Nagar 7:40 AM - Maruthi Nagar - Swetha Garden - Rajarajeswari Temple - Mohan Nagar - New Nagole - College',
  },
  {
    routeNo: '14',
    driver: 'Amith',
    mobile: '8374345998',
    stops:
      'Film Nagar 7:00 AM - Jubilee Hill Check Post - TV9 - Panjagutta - Nims - Khairatabad - Abids - Big Bazar - Gujarathgally - Koti Womens College - Chadargattu - IS Sadan - KarmanGhatt (Yadagiri Function Hall) - College',
  },
  {
    routeNo: '15',
    driver: 'Sattar',
    mobile: '9391702419',
    stops:
      'Sitapalmandi 7:10 AM - Namalagundu - Warasiguda - Warasiguda (ATM) - Jamia Osmania Railway Station - Adikmet (Clinic) - Ram Nagar Gundu (Babai Hotel) - Vidya Nagar(Turning point) - Andhra Mahila Sabha - Tilak Nagar - Vishal Shopping Mall - Hyd. Public School - Pragathi Nagar Khaman - Bharath Petrol pump - BN Reddy(Bharath Petrol pump) - College',
  },
  {
    routeNo: '16',
    driver: 'Yadaiah',
    mobile: '9553651616',
    stops:
      'Bagh Lingampally (Park) 7:25 AM - Vidya Nagar - Shankar Mutt - Koranti (Fever Hospital) - Tilak Nagar - 6 No. - Sriramana Theatre - Police Line - Ali Café - RTO office - Musarambagh - TV Tower - DSNR - College',
  },
  {
    routeNo: '17',
    driver: 'Narsimha Reddy',
    mobile: '9849329857',
    stops:
      'Ammuguda X Road 7:10 AM - Sainikpuri X Road - AS Rao Nagar - Radhika Theatre - Ashok Nagar - Mallapur Bridge - Nacharam - College',
  },
  {
    routeNo: '18',
    driver: 'Srinivas Reddy',
    mobile: '7036577953',
    stops:
      'Dammaiguda - Saketh 7:05 AM - Kapra - North Kamala Nagar - HB Bus Stop - HB Colony II Phase - HB Colony I Phase - HMT - College',
  },
  {
    routeNo: '19',
    driver: 'Anjaiah',
    mobile: '9652224925',
    stops:
      'City College 7:35 AM - Afjal Gunj - Darushifa Majid - Nalgonda X Road - Yashoda Hospital - Super Bazar - TMC DSNR - College',
  },
  {
    routeNo: '20',
    driver: 'Khadeer',
    mobile: '9963195755',
    stops:
      'Yadagiri Theatre 7:50 AM - Swagath Hotel - Bhairamalguda - GJR Garden - Brahmana palli X road - College',
  },
  {
    routeNo: '21',
    driver: 'Nagesh',
    mobile: '9908016129',
    stops: 'TBA',
  },
  {
    routeNo: '22',
    driver: 'M M Khan',
    mobile: '9676346034',
    stops:
      'Gaddi Annaram Muncipal Office 7:40 AM - Chowdi - Saroor Nagar(Municipal Office) - HUDA Complex - Kothapet X Road - LB Nagar Metro station - College',
  },
  {
    routeNo: '23',
    driver: 'Balram',
    mobile: '6309044435',
    stops:
      'Gandhi Nagar Khaman 7:10 AM - Kavadiguda (Kalpana, Praga Tools) - Musheerabad - Padma Rao Nagar Chilkalguda - Tarnaka (Bata) - NGRI - B.N. Reddy Reservoir - Sagar Complex - College',
  },
  {
    routeNo: '24',
    driver: 'Narsimha Reddy',
    mobile: '9866620077',
    stops:
      'Liberty 7:25 AM - Tata Show Room - Himayat Nagar X Road - Old MLA Quarters - Narayanguda - Kachiguda X Road - Vysya Hostel - Nimboliadda - Saidabad - IBP Pump - Singareni Colony - Green Park Colony - College',
  },
  {
    routeNo: '25',
    driver: 'Agamaiah',
    mobile: '9652229368',
    stops:
      'Canara Nagar 7:25 AM - Medipally - Chengicherla X Road - Narapally - Jodumetla - ORR - College',
  },
  {
    routeNo: '26',
    driver: 'Sandeep Reddy',
    mobile: '9848904756',
    stops:
      'Bandla Guda 7:45 AM - Indu Aranya - South End Park - Mansoorabad X Road - Ayyappa Temple - Sahara X Road - More - Chithraseema Colony - College',
  },
  {
    routeNo: '27',
    driver: 'A. Sarvotham Reddy',
    mobile: '9866917930',
    stops:
      '7:55 AM - Balapur X Road - Lenin Nagar - Badangpet - Venkatadri Colony - MVSR College - Nadargul - Adibatla TCS - College',
  },
  {
    routeNo: '28',
    driver: 'Murthy',
    mobile: '9848135937',
    stops:
      'Saroornagar Lake 7:40 AM - Sivaganga - RED Cross - DSNR - Astalaxmi Temple - LB Nagar - College',
  },
  {
    routeNo: '29',
    driver: 'Laxmi Narayana',
    mobile: '9440940368',
    stops:
      'Bandla Guda 7:45 AM - Anand Nagar - Ananthula Garden - Sujatha Hotel - College',
  },
  {
    routeNo: '30',
    driver: 'Chelma Reddy',
    mobile: '9010983392',
    stops:
      'Gayatrinagar X Road 7:50 AM - Jillalaguda - Meerpet - Narayana IIT Olympiad School - Meerpet Police Station - Prashanth Hill X Road - College',
  },
  {
    routeNo: '31',
    driver: 'Devaiah',
    mobile: '9866005526',
    stops:
      'Canara Nagar 7:40 AM - Pochamma Temple - Boduppal Depot - Amma Hospital - Injapur - College',
  },
  {
    routeNo: '32',
    driver: 'Venkatesh',
    mobile: '9603702214',
    stops:
      'Chaitanyapuri 7:35 AM - Jain Temple - Mohan Nagar - Sai Baba temple - College',
  },
  {
    routeNo: '33',
    driver: 'Kareem',
    mobile: '7032284862',
    stops: 'DSNR 7:55 AM - Rajadhani - Chaitanyapuri - RythuBazar - College',
  },
  {
    routeNo: '34',
    driver: 'Kishan',
    mobile: '9553471877',
    stops:
      'TKR College 7:45 AM - Nandi Hills - Prashanth Hills X Road - Almasguda - Gurramguda - College',
  },
  {
    routeNo: '35',
    driver: 'Srinivas',
    mobile: '9951575889',
    stops:
      "JNTU-Vivekananda Nagar 6:50 AM - Kukatpally - Y Junction - Bharath Nagar - Erragadda - SR Nagar(Circle) - Mythri Vanam - Ameerpet (Kanakadurga Temple) - Lal Bungalow - Life Style - HPS - Shopper's Stop - Anand Theatre - College",
  },
  {
    routeNo: '36',
    driver: 'Sridhar Reddy',
    mobile: '9550299927',
    stops:
      '8:00 AM - Nandi Hills - Bharathi School - Manasa Garden - Hanuman Temple - B.D Reddy Garden - College',
  },
  {
    routeNo: '37',
    driver: 'P. Dhasarath Reddy',
    mobile: '9177770023',
    stops:
      'Omkar Nagar(Petrol Pump) 8:10 AM - Central Grammar School - College',
  },
  {
    routeNo: '38',
    driver: 'RamaChandra Reddy',
    mobile: '9849286951',
    stops:
      'Alpha School 7:55 AM - Chintalkunta - Agamaiah Colony - SBH ATM - Ganesh Temple - Red Tank - Vanitha Super Market - DPS School - College',
  },
  {
    routeNo: '39',
    driver: 'Bikshapathi',
    mobile: '9701166973',
    stops: 'TBA',
  },
  {
    routeNo: '40',
    driver: 'M. Rafi',
    mobile: '9059307770',
    stops:
      'Laxmi Nagar 7:20 AM - Jyothi Nagar - Karahan Chowrasta - Attapur - Hyderguda - Upparapally - Dairy Farm - Aramgar X Road - Chandrayan Gutta - DRDL - College',
  },
  {
    routeNo: '41',
    driver: 'A. Raju',
    mobile: '8309266162',
    stops:
      'Nagaram X Roads 7:10 AM - Chakripuram - Kushaiguda - ECIL - SP Nagar - Kamala Nagar - Housing Board Phase-I - Lalapet - Ram Talkies - White House - Tarnaka - Alkapuri Road No 1 - College',
  },
  {
    routeNo: '42',
    driver: 'Laxma Reddy',
    mobile: '9908304449',
    stops:
      'SR College (CCMV Colony-Bodduppal) 7:25 AM - Indira Nagar - Boduppal X Road - Ambedkar Statue - NTR Statue - Boduppal Khaman - Firzadiguda Khaman - Aditya Hospital - Uppal Bus Stand - Gandhi Statue - Current Junction - College',
  },
  {
    routeNo: '43',
    driver: 'Asif',
    mobile: '9515448661',
    stops:
      'Hayathnagar(RTC Colony) 7:40 AM - Siva Sindhu - Govt High School - Sri Indu College - Vaidehi Colony - College',
  },
  {
    routeNo: '44',
    driver: 'Srinivas Reddy',
    mobile: '9849330986',
    stops:
      'Tangrilla Apartments 8:05 AM - ME Reddy Function Hall - Sushma Theatre - Raith bazar - Ravindra Bharathi School - College',
  },
  {
    routeNo: '45',
    driver: 'Krishna Reddy',
    mobile: '8125725624',
    stops:
      'JNTU 7:05 AM - Nizampet X Road - Miyapur - Kondapur X Road - Kothaguda - Anjaiah Nagar - ORR - College',
  },
  {
    routeNo: '46',
    driver: 'Krishna',
    mobile: '9396566657',
    stops:
      '7:55 AM - Bhagyalatha - Hospital - Shanthi Nagar - Sarada Nagar - High Court Colony - Kamala Nagar - College',
  },
  {
    routeNo: '47',
    driver: 'Ravinder Reddy',
    mobile: '7382809308',
    stops:
      'St No.8 (Habsiguda) 7:25 AM - Ramanthapur Church - Uppal - Nagole Bridge - Snehapuri - Rock Town Reliance Pump - BATA SBI - College',
  },
  {
    routeNo: '48',
    driver: 'Devender',
    mobile: '9490001410',
    stops:
      'East Anand Bagh 7:10 AM - ZTS - Carban - H.B. I Phase - Noma Function Hall - Chilakanagar - Srinivasa Heights(Bersheeba Church) - Survey Of India - College',
  },
  {
    routeNo: '49',
    driver: 'Venkatesh',
    mobile: '9948948797',
    stops:
      'Shivaji Chowk 7:50 AM - Sai Nagar - Dathu Nagar - Mandamallamma - Anantha Reddy Garden - Gayathri Nagar - TKR Khaman - Alekhya Tower - Sagar Complex - College',
  },
  {
    routeNo: '50',
    driver: 'Yadaiah',
    mobile: '9985061819',
    stops:
      'Kuntloor 7:50 AM - Bharathi Petrol Pump - Bawarchi Hotel - Mandal Office (Hayathnagar) - RTC depot (Hayathnagar) - College',
  },
];

const BusRoutes = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Bus Routes</Text>
      {busRoutes.map((route, index) => (
        <List.Accordion
          key={index}
          title={`Route No. ${route.routeNo} - Driver: ${route.driver}`}
          description={`Mobile: ${route.mobile}`}
          left={(props) => <List.Icon {...props} icon="bus" />}
        >
          <Text style={styles.stops}>{route.stops}</Text>
        </List.Accordion>
      ))}

      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>For Assistance, Contact:</Text>
        <Text style={styles.contactText}>
          🚍 <Text style={styles.bold}>Y. Krishna (Transport In-Charge):</Text>{' '}
          9849028147 / 8523028147
        </Text>
        <Text style={styles.contactText}>
          🏫{' '}
          <Text style={styles.bold}>
            Sharath Kumar Reddy (Physical Director):
          </Text>{' '}
          9849879460
        </Text>
        <Text style={styles.contactText}>
          🏫{' '}
          <Text style={styles.bold}>Amarender Reddy (Physical Director):</Text>{' '}
          9908646569
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 15,
    color: '#007bff',
  },
  stops: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    color: '#333',
  },
  contactSection: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#d32f2f',
  },
  contactText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 2,
    color: '#444',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default BusRoutes;
