import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useThemedPalette } from '@/theme/ThemeContext';

const IS_ANDROID = Platform.OS === 'android';

import SettingsIndex from '@/screens/modules/settings/SettingsIndex';
import SettingsAccount from '@/screens/modules/settings/SettingsAccount';
import SettingsNotifications from '@/screens/modules/settings/SettingsNotifications';
import SettingsPrivacy from '@/screens/modules/settings/SettingsPrivacy';
import SettingsSecurity from '@/screens/modules/settings/SettingsSecurity';

import StudioIndex from '@/screens/modules/studio/StudioIndex';
import StudioDrafts from '@/screens/modules/studio/StudioDrafts';
import StudioSchedule from '@/screens/modules/studio/StudioSchedule';
import StudioImageComposer from '@/screens/modules/studio/StudioImageComposer';
import StudioTextComposer from '@/screens/modules/studio/StudioTextComposer';
import StudioVideoComposer from '@/screens/modules/studio/StudioVideoComposer';

import ArtIndex from '@/screens/modules/art/ArtIndex';
import ArtList from '@/screens/modules/art/ArtList';
import ArtCommissions from '@/screens/modules/art/ArtCommissions';
import ArtDetail from '@/screens/modules/art/ArtDetail';

import LearningIndex from '@/screens/modules/learning/LearningIndex';
import LearningCourse from '@/screens/modules/learning/LearningCourse';

import JobsIndex from '@/screens/modules/jobs/JobsIndex';
import JobsActiveDeals from '@/screens/modules/jobs/JobsActiveDeals';
import JobsRateCard from '@/screens/modules/jobs/JobsRateCard';
import JobsApply from '@/screens/modules/jobs/JobsApply';
import JobDetail from '@/screens/modules/jobs/JobDetail';

import CommunityIndex from '@/screens/modules/community/CommunityIndex';
import CommunityEvents from '@/screens/modules/community/CommunityEvents';
import CommunityGroups from '@/screens/modules/community/CommunityGroups';
import ChallengesIndex from '@/screens/modules/community/challenges/ChallengesIndex';
import ChallengeDetail from '@/screens/modules/community/challenges/ChallengeDetail';

import InboxThread from '@/screens/modules/inbox/InboxThread';
import CameraScreen from '@/screens/modules/camera/Camera';

import PortfolioIndex from '@/screens/modules/portfolio/PortfolioIndex';
import PortfolioEdit from '@/screens/modules/portfolio/PortfolioEdit';
import PortfolioPieceEditor from '@/screens/modules/portfolio/PortfolioPieceEditor';
import PortfolioPublicPreview from '@/screens/modules/portfolio/PortfolioPublicPreview';

import ReputationIndex from '@/screens/modules/reputation/ReputationIndex';
import ReputationBadges from '@/screens/modules/reputation/ReputationBadges';
import ReputationVerification from '@/screens/modules/reputation/ReputationVerification';

import FinanceIndex from '@/screens/modules/finance/FinanceIndex';
import FinancePayouts from '@/screens/modules/finance/FinancePayouts';
import FinanceTransactions from '@/screens/modules/finance/FinanceTransactions';
import FinanceTax from '@/screens/modules/finance/FinanceTax';
import FinanceInvoice from '@/screens/modules/finance/FinanceInvoice';

import MerchIndex from '@/screens/modules/merch/MerchIndex';
import MerchStore from '@/screens/modules/merch/MerchStore';
import MerchCreate from '@/screens/modules/merch/MerchCreate';
import MerchOrders from '@/screens/modules/merch/MerchOrders';

import AudienceIndex from '@/screens/modules/audience/AudienceIndex';
import AudienceConnections from '@/screens/modules/audience/AudienceConnections';
import AudienceTopFans from '@/screens/modules/audience/AudienceTopFans';
import AudienceEmailList from '@/screens/modules/audience/AudienceEmailList';
import AudienceLandingPage from '@/screens/modules/audience/AudienceLandingPage';

import AnalyticsIndex from '@/screens/modules/analytics/AnalyticsIndex';
import AnalyticsAiInsights from '@/screens/modules/analytics/AnalyticsAiInsights';
import AnalyticsContentPerformance from '@/screens/modules/analytics/AnalyticsContentPerformance';
import AnalyticsCrossPlatform from '@/screens/modules/analytics/AnalyticsCrossPlatform';

const Stack = createNativeStackNavigator();

export default function ModulesNavigator() {
  const palette = useThemedPalette();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: palette.bone },
        animation: 'slide_from_right',
        // Faster slide on Android to keep button tap → next screen feeling
        // instant. The 280ms iOS curve looks sluggish on Android phones that
        // can't always hit 60fps during the slide.
        animationDuration: IS_ANDROID ? 200 : 280,
        freezeOnBlur: true,
      }}
    >
      <Stack.Screen name="SettingsIndex" component={SettingsIndex} />
      <Stack.Screen name="SettingsAccount" component={SettingsAccount} />
      <Stack.Screen name="SettingsNotifications" component={SettingsNotifications} />
      <Stack.Screen name="SettingsPrivacy" component={SettingsPrivacy} />
      <Stack.Screen name="SettingsSecurity" component={SettingsSecurity} />

      <Stack.Screen name="StudioIndex" component={StudioIndex} />
      <Stack.Screen name="StudioDrafts" component={StudioDrafts} />
      <Stack.Screen name="StudioSchedule" component={StudioSchedule} />
      <Stack.Screen name="StudioImageComposer" component={StudioImageComposer} />
      <Stack.Screen name="StudioTextComposer" component={StudioTextComposer} />
      <Stack.Screen name="StudioVideoComposer" component={StudioVideoComposer} />

      <Stack.Screen name="ArtIndex" component={ArtIndex} />
      <Stack.Screen name="ArtList" component={ArtList} />
      <Stack.Screen name="ArtCommissions" component={ArtCommissions} />
      <Stack.Screen name="ArtDetail" component={ArtDetail} />

      <Stack.Screen name="LearningIndex" component={LearningIndex} />
      <Stack.Screen name="LearningCourse" component={LearningCourse} />

      <Stack.Screen name="JobsIndex" component={JobsIndex} />
      <Stack.Screen name="JobsActiveDeals" component={JobsActiveDeals} />
      <Stack.Screen name="JobsRateCard" component={JobsRateCard} />
      <Stack.Screen name="JobsApply" component={JobsApply} />
      <Stack.Screen name="JobDetail" component={JobDetail} />

      <Stack.Screen name="CommunityIndex" component={CommunityIndex} />
      <Stack.Screen name="CommunityEvents" component={CommunityEvents} />
      <Stack.Screen name="CommunityGroups" component={CommunityGroups} />
      <Stack.Screen name="ChallengesIndex" component={ChallengesIndex} />
      <Stack.Screen name="ChallengeDetail" component={ChallengeDetail} />

      <Stack.Screen
        name="InboxThread"
        component={InboxThread}
        options={{
          animation: 'slide_from_right',
          animationDuration: IS_ANDROID ? 220 : 300,
          contentStyle: { backgroundColor: '#0A0A0A' },
        }}
      />

      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          animation: 'slide_from_bottom',
          animationDuration: IS_ANDROID ? 220 : 320,
          contentStyle: { backgroundColor: '#0A0A0A' },
        }}
      />

      <Stack.Screen name="PortfolioIndex" component={PortfolioIndex} />
      <Stack.Screen name="PortfolioEdit" component={PortfolioEdit} />
      <Stack.Screen name="PortfolioPieceEditor" component={PortfolioPieceEditor} />
      <Stack.Screen name="PortfolioPublicPreview" component={PortfolioPublicPreview} />

      <Stack.Screen name="ReputationIndex" component={ReputationIndex} />
      <Stack.Screen name="ReputationBadges" component={ReputationBadges} />
      <Stack.Screen name="ReputationVerification" component={ReputationVerification} />

      <Stack.Screen name="FinanceIndex" component={FinanceIndex} />
      <Stack.Screen name="FinancePayouts" component={FinancePayouts} />
      <Stack.Screen name="FinanceTransactions" component={FinanceTransactions} />
      <Stack.Screen name="FinanceTax" component={FinanceTax} />
      <Stack.Screen name="FinanceInvoice" component={FinanceInvoice} />

      <Stack.Screen name="MerchIndex" component={MerchIndex} />
      <Stack.Screen name="MerchStore" component={MerchStore} />
      <Stack.Screen name="MerchCreate" component={MerchCreate} />
      <Stack.Screen name="MerchOrders" component={MerchOrders} />

      <Stack.Screen name="AudienceIndex" component={AudienceIndex} />
      <Stack.Screen name="AudienceConnections" component={AudienceConnections} />
      <Stack.Screen name="AudienceTopFans" component={AudienceTopFans} />
      <Stack.Screen name="AudienceEmailList" component={AudienceEmailList} />
      <Stack.Screen name="AudienceLandingPage" component={AudienceLandingPage} />

      <Stack.Screen name="AnalyticsIndex" component={AnalyticsIndex} />
      <Stack.Screen name="AnalyticsAiInsights" component={AnalyticsAiInsights} />
      <Stack.Screen name="AnalyticsContentPerformance" component={AnalyticsContentPerformance} />
      <Stack.Screen name="AnalyticsCrossPlatform" component={AnalyticsCrossPlatform} />
    </Stack.Navigator>
  );
}
