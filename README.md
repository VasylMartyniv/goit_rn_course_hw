## HW-3

Custom components for reusability:
 - ScreenContainer
 - SectionTitle
 - TodoItem
 - CustomInput
 - CustomButton
 - CustomDrawerItem
![demo.jpg](demo.jpg)

## HW-4
Screens: Login, SignUp, Demo, MainApp, Home, Category.
Navigators: 
 - MainStack (Login, SignUp, Demo, MainApp)
 - DrawerNavigator (Home, Category)
![demo2.jpg](demo2.jpg)

## HW-5
Categories and Todos are loaded from JSON api server (db.json).
![demo3.jpg](demo3.jpeg)

## HW-6
Theme changes using Context API. All data in app is loaded from API and AsyncStorage using Redux.
The example is in demo4.mp4 file.

## HW-7
Todo completion animation was implemented using React Native Reanimated.
example can be found in demo7_1.mp4 file in the repo

The todo item component and the list are optimized using React.memo and useCallback.
![demo7_2.jpeg](demo7_2.jpeg)

Heavy momentjs library was replaced with dayjs, this resulted in 0.13 MB size reduction for bundle. Screenshots:
1) Before momentjs removal
2) After momentjs removal
3) After dayjs addition
![demo7_3.jpeg](demo7_3.jpeg)