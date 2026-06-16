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
import SettingsHelp from '@/screens/modules/settings/SettingsHelp';
import SettingsBlocked from '@/screens/modules/settings/SettingsBlocked';

import StudioIndex from '@/screens/modules/studio/StudioIndex';
import StudioDrafts from '@/screens/modules/studio/StudioDrafts';
import StudioSchedule from '@/screens/modules/studio/StudioSchedule';
import StudioContent from '@/screens/modules/studio/StudioContent';
import StudioImageComposer from '@/screens/modules/studio/StudioImageComposer';
import StudioTextComposer from '@/screens/modules/studio/StudioTextComposer';
import StudioAudioComposer from '@/screens/modules/studio/StudioAudioComposer';
import StudioLiveComposer from '@/screens/modules/studio/StudioLiveComposer';

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
import JobsApplications from '@/screens/modules/jobs/JobsApplications';
import GigNegotiation from '@/screens/modules/jobs/GigNegotiation';
import GigContract from '@/screens/modules/jobs/GigContract';
import GigDeliver from '@/screens/modules/jobs/GigDeliver';
import GigPayment from '@/screens/modules/jobs/GigPayment';

import CommunityIndex from '@/screens/modules/community/CommunityIndex';
import CommunityIntro from '@/screens/modules/community/CommunityIntro';
import CommunityEvents from '@/screens/modules/community/CommunityEvents';
import CommunityGroups from '@/screens/modules/community/CommunityGroups';
import CommunityGroupDetail from '@/screens/modules/community/CommunityGroupDetail';
import CommunityEventDetail from '@/screens/modules/community/CommunityEventDetail';
import CommunityDirectory from '@/screens/modules/community/CommunityDirectory';
import CommunityMentorship from '@/screens/modules/community/CommunityMentorship';
import CommunityQA from '@/screens/modules/community/CommunityQA';
import ChallengesIndex from '@/screens/modules/community/challenges/ChallengesIndex';
import ChallengeDetail from '@/screens/modules/community/challenges/ChallengeDetail';
import ChallengeReel from '@/screens/modules/community/challenges/ChallengeReel';

import InboxThread from '@/screens/modules/inbox/InboxThread';
import CameraScreen from '@/screens/modules/camera/Camera';
import NotificationsIndex from '@/screens/modules/notifications/NotificationsIndex';

import PortfolioIndex from '@/screens/modules/portfolio/PortfolioIndex';
import PortfolioEdit from '@/screens/modules/portfolio/PortfolioEdit';
import PortfolioPieceEditor from '@/screens/modules/portfolio/PortfolioPieceEditor';
import PortfolioPublicPreview from '@/screens/modules/portfolio/PortfolioPublicPreview';

import ProfilePostsViewer from '@/screens/modules/profile/PostsViewer';
import ProfileReelViewer from '@/screens/modules/profile/ReelViewer';
import ProfileEdit from '@/screens/modules/profile/ProfileEdit';
import UserProfile from '@/screens/modules/profile/UserProfile';
import SavedIndex from '@/screens/modules/profile/SavedIndex';
import PostDetail from '@/screens/modules/profile/PostDetail';

import ReputationIndex from '@/screens/modules/reputation/ReputationIndex';
import ReputationBadges from '@/screens/modules/reputation/ReputationBadges';
import ReputationVerification from '@/screens/modules/reputation/ReputationVerification';

import FinanceIndex from '@/screens/modules/finance/FinanceIndex';
import FinancePayouts from '@/screens/modules/finance/FinancePayouts';
import FinanceTransactions from '@/screens/modules/finance/FinanceTransactions';
import FinanceTax from '@/screens/modules/finance/FinanceTax';
import FinanceInvoice from '@/screens/modules/finance/FinanceInvoice';
import FinancePaymentMethods from '@/screens/modules/finance/FinancePaymentMethods';

import MerchIndex from '@/screens/modules/merch/MerchIndex';
import MerchStore from '@/screens/modules/merch/MerchStore';
import MerchCreate from '@/screens/modules/merch/MerchCreate';
import MerchOrders from '@/screens/modules/merch/MerchOrders';
import MerchMockup from '@/screens/modules/merch/MerchMockup';
import MerchAnalytics from '@/screens/modules/merch/MerchAnalytics';
import MerchDesigners from '@/screens/modules/merch/MerchDesigners';
import MerchStudio from '@/screens/modules/merch/studio/MerchStudio';
import MerchStudioReview from '@/screens/modules/merch/studio/MerchStudioReview';
import MerchStudioStep1 from '@/screens/modules/merch/studio/Step1Identity';
import MerchStudioStep2 from '@/screens/modules/merch/studio/Step2Theme';
import MerchStudioStep3 from '@/screens/modules/merch/studio/Step3Banner';
import MerchStudioStep4 from '@/screens/modules/merch/studio/Step4Layout';
import MerchStudioStep5 from '@/screens/modules/merch/studio/Step5Products';
import MerchStudioStep6 from '@/screens/modules/merch/studio/Step6Mockups';
import MerchPublished from '@/screens/modules/merch/studio/MerchPublished';
import MerchPreview from '@/screens/modules/merch/studio/MerchPreview';

import AudienceIndex from '@/screens/modules/audience/AudienceIndex';
import AudienceConnections from '@/screens/modules/audience/AudienceConnections';
import AudienceTopFans from '@/screens/modules/audience/AudienceTopFans';
import AudienceEmailList from '@/screens/modules/audience/AudienceEmailList';
import AudienceLandingPage from '@/screens/modules/audience/AudienceLandingPage';

import AnalyticsIndex from '@/screens/modules/analytics/AnalyticsIndex';
import AnalyticsAiInsights from '@/screens/modules/analytics/AnalyticsAiInsights';
import AnalyticsContentPerformance from '@/screens/modules/analytics/AnalyticsContentPerformance';
import AnalyticsCrossPlatform from '@/screens/modules/analytics/AnalyticsCrossPlatform';
import AnalyticsEarnings from '@/screens/modules/analytics/AnalyticsEarnings';
import AnalyticsAudience from '@/screens/modules/analytics/AnalyticsAudience';

import TipsIndex from '@/screens/modules/tips/TipsIndex';
import CollabIndex from '@/screens/modules/collab/CollabIndex';
import CollabSend from '@/screens/modules/collab/CollabSend';
import CollabRequestDetail from '@/screens/modules/collab/CollabRequestDetail';
import ProfileVisibility from '@/screens/modules/profile/ProfileVisibility';

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
      <Stack.Screen name="NotificationsIndex" component={NotificationsIndex} />
      <Stack.Screen name="SettingsIndex" component={SettingsIndex} />
      <Stack.Screen name="SettingsAccount" component={SettingsAccount} />
      <Stack.Screen name="SettingsNotifications" component={SettingsNotifications} />
      <Stack.Screen name="SettingsPrivacy" component={SettingsPrivacy} />
      <Stack.Screen name="SettingsSecurity" component={SettingsSecurity} />
      <Stack.Screen name="SettingsHelp" component={SettingsHelp} />
      <Stack.Screen name="SettingsBlocked" component={SettingsBlocked} />

      <Stack.Screen name="StudioIndex" component={StudioIndex} />
      <Stack.Screen name="StudioContent" component={StudioContent} />
      <Stack.Screen name="StudioDrafts" component={StudioDrafts} />
      <Stack.Screen name="StudioSchedule" component={StudioSchedule} />
      <Stack.Screen name="StudioImageComposer" component={StudioImageComposer} />
      <Stack.Screen name="StudioTextComposer" component={StudioTextComposer} />
      <Stack.Screen name="StudioAudioComposer" component={StudioAudioComposer} />
      <Stack.Screen name="StudioLiveComposer" component={StudioLiveComposer} />

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
      <Stack.Screen name="JobsApplications" component={JobsApplications} />
      <Stack.Screen name="GigNegotiation" component={GigNegotiation} />
      <Stack.Screen name="GigContract" component={GigContract} />
      <Stack.Screen name="GigDeliver" component={GigDeliver} />
      <Stack.Screen name="GigPayment" component={GigPayment} />

      <Stack.Screen name="CommunityIndex" component={CommunityIndex} />
      <Stack.Screen name="CommunityIntro" component={CommunityIntro} />
      <Stack.Screen name="CommunityEvents" component={CommunityEvents} />
      <Stack.Screen name="CommunityEventDetail" component={CommunityEventDetail} />
      <Stack.Screen name="CommunityGroups" component={CommunityGroups} />
      <Stack.Screen name="CommunityGroupDetail" component={CommunityGroupDetail} />
      <Stack.Screen name="CommunityDirectory" component={CommunityDirectory} />
      <Stack.Screen name="CommunityMentorship" component={CommunityMentorship} />
      <Stack.Screen name="CommunityQA" component={CommunityQA} />
      <Stack.Screen name="ChallengesIndex" component={ChallengesIndex} />
      <Stack.Screen name="ChallengeDetail" component={ChallengeDetail} />
      <Stack.Screen
        name="ChallengeReel"
        component={ChallengeReel}
        options={{
          animation: 'fade',
          contentStyle: { backgroundColor: '#000' },
        }}
      />

      <Stack.Screen
        name="InboxThread"
        component={InboxThread}
        options={{
          animation: 'slide_from_right',
          animationDuration: IS_ANDROID ? 220 : 300,
          contentStyle: { backgroundColor: palette.bone },
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

      <Stack.Screen name="ProfilePostsViewer" component={ProfilePostsViewer} />
      <Stack.Screen
        name="ProfileReelViewer"
        component={ProfileReelViewer}
        options={{
          animation: 'fade',
          contentStyle: { backgroundColor: '#000' },
        }}
      />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="SavedIndex" component={SavedIndex} />
      <Stack.Screen name="PostDetail" component={PostDetail} />

      <Stack.Screen name="ReputationIndex" component={ReputationIndex} />
      <Stack.Screen name="ReputationBadges" component={ReputationBadges} />
      <Stack.Screen name="ReputationVerification" component={ReputationVerification} />

      <Stack.Screen name="FinanceIndex" component={FinanceIndex} />
      <Stack.Screen name="FinancePayouts" component={FinancePayouts} />
      <Stack.Screen name="FinanceTransactions" component={FinanceTransactions} />
      <Stack.Screen name="FinanceTax" component={FinanceTax} />
      <Stack.Screen name="FinanceInvoice" component={FinanceInvoice} />
      <Stack.Screen name="FinancePaymentMethods" component={FinancePaymentMethods} />

      <Stack.Screen name="MerchIndex" component={MerchIndex} />
      <Stack.Screen name="MerchStore" component={MerchStore} />
      <Stack.Screen name="MerchCreate" component={MerchCreate} />
      <Stack.Screen name="MerchOrders" component={MerchOrders} />
      <Stack.Screen name="MerchMockup" component={MerchMockup} />
      <Stack.Screen name="MerchAnalytics" component={MerchAnalytics} />
      <Stack.Screen name="MerchDesigners" component={MerchDesigners} />

      <Stack.Screen name="MerchStudio" component={MerchStudio} />
      <Stack.Screen name="MerchStudioReview" component={MerchStudioReview} />
      <Stack.Screen name="MerchStudioStep1" component={MerchStudioStep1} />
      <Stack.Screen name="MerchStudioStep2" component={MerchStudioStep2} />
      <Stack.Screen name="MerchStudioStep3" component={MerchStudioStep3} />
      <Stack.Screen name="MerchStudioStep4" component={MerchStudioStep4} />
      <Stack.Screen name="MerchStudioStep5" component={MerchStudioStep5} />
      <Stack.Screen name="MerchStudioStep6" component={MerchStudioStep6} />
      <Stack.Screen name="MerchPublished" component={MerchPublished} />
      <Stack.Screen
        name="MerchPreview"
        component={MerchPreview}
        options={{
          animation: 'slide_from_bottom',
          animationDuration: IS_ANDROID ? 220 : 320,
        }}
      />

      <Stack.Screen name="AudienceIndex" component={AudienceIndex} />
      <Stack.Screen name="AudienceConnections" component={AudienceConnections} />
      <Stack.Screen name="AudienceTopFans" component={AudienceTopFans} />
      <Stack.Screen name="AudienceEmailList" component={AudienceEmailList} />
      <Stack.Screen name="AudienceLandingPage" component={AudienceLandingPage} />

      <Stack.Screen name="AnalyticsIndex" component={AnalyticsIndex} />
      <Stack.Screen name="AnalyticsAiInsights" component={AnalyticsAiInsights} />
      <Stack.Screen name="AnalyticsContentPerformance" component={AnalyticsContentPerformance} />
      <Stack.Screen name="AnalyticsCrossPlatform" component={AnalyticsCrossPlatform} />
      <Stack.Screen name="AnalyticsEarnings" component={AnalyticsEarnings} />
      <Stack.Screen name="AnalyticsAudience" component={AnalyticsAudience} />

      <Stack.Screen name="TipsIndex" component={TipsIndex} />
      <Stack.Screen name="CollabIndex" component={CollabIndex} />
      <Stack.Screen name="CollabSend" component={CollabSend} />
      <Stack.Screen name="CollabRequestDetail" component={CollabRequestDetail} />
      <Stack.Screen name="ProfileVisibility" component={ProfileVisibility} />
    </Stack.Navigator>
  );
}
