import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "tictactoe";
const dummyData = {};

// loadData
export async function loadData() {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : dummyData;
    } catch (e) {
        console.error("Failed to load data", e);
    }
}

// saveData
export async function saveData(data) {
    try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error("Failed to save data", e);
    }
}
