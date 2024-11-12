import {Tabs} from 'expo-router';
import {useThemedStyles} from "@/hooks/useThemedStyles";
import {TabBarIcon} from "@/components/TabBarIcon";
import {Theme} from "@/themes/Theme";

export default function TabLayout() {
    const style = useThemedStyles(styles);

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: style.tabBar.item.selectedTintColor,
                tabBarInactiveTintColor: style.tabBar.item.unselectedTintColor,
                tabBarStyle: {
                    backgroundColor: style.tabBar.backgroundColor,
                },
                headerShown: true,
                headerStyle: {
                    backgroundColor: style.navigationBar.backgroundColor,
                },
                headerTintColor: style.navigationBar.color,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Weather',
                    tabBarIcon: ({color}) => <TabBarIcon name="home" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({color}) => <TabBarIcon name="cog" color={color}/>,
                }}
            />
        </Tabs>
    );
}

const styles = (theme: Theme) => {
    return {
        tabBar: {
            backgroundColor: theme.backgroundColor,
            item: {
                unselectedTintColor: theme.secondaryColor,
                selectedTintColor: theme.primaryColor,
            }
        },
        navigationBar: {
            backgroundColor: theme.primaryColor,
            color: theme.secondaryColor,
        }
    };
};
