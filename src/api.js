import {
  get,
  ref,
  limitToFirst,
  query,
  startAfter,
  orderByKey,
} from 'firebase/database';
export const getAllTeachers = async db => {
  try {
    const dataRef = ref(db, '/');
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      console.log('No data available');
      return null;
    }
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};

//---------------
// export const getAllTeachers = async db => {
//   try {
//     const dataRef = ref(db, '/');
//     const firstFourQuery = query(dataRef, limitToFirst(4));
//     const snapshot = await get(firstFourQuery);

//     if (snapshot.exists()) {
//       const data = snapshot.val();
//       console.log('data: ', data);
//       return data;
//     } else {
//       console.log('No data available');
//       return null;
//     }
//   } catch (error) {
//     console.error('Error getting data:', error);
//     return null;
//   }
// };

export const getStartTeachers = async db => {
  try {
    const dataRef = ref(db, '/');
    const firstFourQuery = query(dataRef, limitToFirst(4));
    const snapshot = await get(firstFourQuery);

    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      console.log('No data available');
      return null;
    }
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};

export const getTeachers = async (db, lastKey = null) => {
  try {
    const dataRef = ref(db, '/');
    let teachersQuery;

    if (lastKey) {
      teachersQuery = query(
        dataRef,
        orderByKey(),
        startAfter(lastKey),
        limitToFirst(4)
      );
    } else {
      teachersQuery = query(dataRef, orderByKey(), limitToFirst(4));
    }

    const snapshot = await get(teachersQuery);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const teachersArray = Object.values(data);
      const newLastKey = Object.keys(data).pop(); // 🔥 Берем последний ключ

      return { teachers: teachersArray, lastKey: newLastKey };
    } else {
      return { teachers: [], lastKey: null }; // ❗ Если данных нет, возвращаем пустой массив
    }
  } catch (error) {
    console.error('Error getting more teachers:', error);
    return { teachers: [], lastKey: null };
  }
};

//----------------Auth--------------------//
