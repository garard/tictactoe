import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  text: {
    fontSize: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  board: {
    width: 300,
    height: 300,
    borderWidth: 12,
    flexWrap: 'wrap',
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  box: {
    borderWidth: 1,
    backgroundColor: 'white',
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  undo: {
    borderWidth: 1,
    fontSize: 30,
    backgroundColor: 'pink',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    textAlign: "center",
  },
  redo: {
    borderWidth: 1,
    fontSize: 30,
    backgroundColor: 'orange',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    textAlign: "center",
  },
});
  
  export default Styles;