import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import AddCategoryModal from './AddCategoryModal';
import CustomDrawerItem from './CustomDrawerItem.tsx';
import {Theme} from '../styles/theme.ts';
import Icon from '@react-native-vector-icons/ionicons';
import {SCREEN_NAMES} from '../constants/routes.ts';
import {useCategories} from '../hooks/hooks.ts';
import {useTheme} from '../state/ThemeContext.tsx';

const CustomDrawerContent = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const categories = useCategories();
  const [modalVisible, setModalVisible] = useState(false);
  const {theme} = useTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.drawerHeader}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(SCREEN_NAMES.MAIN_APP, {
              screen: SCREEN_NAMES.HOME,
            })
          }
          style={{flexDirection: 'row', alignItems: 'center', gap: 16}}>
          <Icon name={'home'} size={32} color={theme.colors.primary[500]} />
          <Text style={styles.drawerHeaderText}>Home</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.drawerContent}>
        <ScrollView style={{width: '100%'}}>
          {categories.map((category, i) => (
            <CustomDrawerItem
              key={category.id}
              onPress={() =>
                navigation.navigate(SCREEN_NAMES.MAIN_APP, {
                  screen: SCREEN_NAMES.CATEGORY,
                  params: {
                    categoryId: category.id,
                    categoryName: category.name,
                  },
                })
              }
              text={category.name}
            />
          )) || (
            <View>
              <Text>No categories yet</Text>
            </View>
          )}
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.iconButton}>
            <Icon
              name={'add-circle'}
              color={theme.colors.primary[500]}
              size={32}
            />
            <Text style={styles.addText}>Add Category</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: SCREEN_NAMES.LOGIN}],
            });
          }}>
          <Icon name={'exit'} color={theme.colors.error} size={32} />
          <Text style={styles.logOutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <AddCategoryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    drawerContainer: {
      paddingStart: 0,
      width: '100%',
      paddingEnd: 0,
    },
    drawerHeader: {
      padding: 16,
      backgroundColor: theme.colors.backgroundLight,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    drawerHeaderText: {
      fontSize: theme.typography.fontSize.xl,
      fontFamily: theme.typography.fontFamily.bold,
      color: theme.colors.text,
    },
    drawerContent: {
      flex: 1,
      margin: 0,
      borderRadius: 0,
      width: '100%',
      marginLeft: 0,
      alignItems: 'flex-start',
    },
    addText: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.primary[500],
      fontFamily: theme.typography.fontFamily.bold,
      fontWeight: 600,
    },
    footer: {
      marginTop: 'auto',
      borderTopWidth: 1,
      borderColor: theme.colors.borderColor,
      alignItems: 'center',
    },
    iconButton: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 8,
      gap: 8,
    },
    logOutText: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.error,
      fontFamily: theme.typography.fontFamily.bold,
      fontWeight: 600,
    },
  });

export default CustomDrawerContent;
