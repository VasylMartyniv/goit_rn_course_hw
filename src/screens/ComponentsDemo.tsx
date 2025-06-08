import React from 'react';
import SectionTitle from '../components/SectionTitle.tsx';
import TodoItem from '../components/TodoItem.tsx';
import CustomInput from '../components/CustomInput.tsx';
import CustomButton from '../components/CustomButton.tsx';
import ScreenContainer from '../components/ScreenContainer.tsx';
import CustomDrawerItem from '../components/CustomDrawerItem.tsx';
import {View} from 'react-native';

function ComponentsDemo() {
  return (
    <ScreenContainer>
      <SectionTitle title={'Demo Section Title'} />
      <TodoItem
        todo={{id: '0', title: 'Demo todo item', completed: false}}
        categoryName={'from demo category'}
      />
      <CustomInput
        placeholder={'Demo input'}
        value={''}
        onChangeText={() => null}
      />
      <View style={{flexDirection: 'row'}}>
        <CustomButton
          title={'Demo Primary Button'}
          variant={'primary'}
          onPress={() => null}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <CustomButton
          title={'Demo Secondary Button'}
          variant={'secondary'}
          onPress={() => null}
        />
      </View>

      <CustomDrawerItem text={'Demo drawer Item'} onPress={() => null} />
    </ScreenContainer>
  );
}

export default ComponentsDemo;
