import {Tabs} from 'expo-router';
import {useClientOnlyValue} from "@/components/useClientOnlyValue";
import {useThemedStyles} from "@/hooks/useThemedStyles";
import {useTheme} from "@/hooks/useTheme";
import {TabBarIcon} from "@/components/TabBarIcon";
import {Theme} from "@/themes/Theme";

export default function TabLayout() {
    const theme = useTheme();
    const style = useThemedStyles(styles);

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: style.tabBarItem.selectedTintColor,
                tabBarInactiveTintColor: style.tabBarItem.unselectedTintColor,
                tabBarStyle: {
                    backgroundColor: style.tabBarItem.backgroundColor,
                },
                headerShown: useClientOnlyValue(false, true),
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
        tabBarItem: {
            backgroundColor: theme.backgroundColor,
            unselectedTintColor: theme.secondaryColor,
            selectedTintColor: theme.primaryColor,
        }
    };
}

