import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Image as RNImage, Platform, Text as RNText } from 'react-native';
import {
  Canvas,
  Fill,
  Group,
  Paint,
  Blur,
  ColorMatrix,
  Text as SkText,
  Path as SkPath,
  Skia,
  useFont,
} from '@shopify/react-native-skia';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  type SharedValue,
} from 'react-native-reanimated';
import type { SkFont } from '@shopify/react-native-skia';
import { router } from '@/navigation';
import { useTheme } from '@/theme/ThemeContext';
import { RuleDot } from '@/components/svg/Marks';
import { type as T } from '@/theme/typography';
import { palette as staticPalette } from '@/theme/colors';
import { BRAND_WORDMARK_ASSETS } from '@/components/brand/BrandWordmark';
import { prefetchImages } from '@/components/ui/Image';
import { feedPosts, profileMock, userFeed } from '@/data/mock';
import { useStore } from '@/store';
import { getAuth } from '@/lib/firebase';

const IS_ANDROID = Platform.OS === 'android';
const { width: W, height: H } = Dimensions.get('window');
const CX = W / 2;
const CY = H * 0.5;

// Heavy display face for the morphing words; Skia renders glyphs from the ttf.
const WORD_FONT = require('../../assets/fonts/CabinetGrotesk-Black.ttf');
const BASE_FONT_SIZE = 130;

// The real underdawg wordmark, as an SVG path (viewBox 0 0 1600 323).
const LOGO_VIEW_W = 1600;
const LOGO_VIEW_H = 323;
const LOGO_D =
  'M1471.00,301.42 C1464.12,300.68 1455.80,299.42 1452.50,298.60 C1449.20,297.79 1444.52,296.63 1442.09,296.02 C1438.07,295.02 1431.50,292.57 1424.97,289.63 C1420.62,287.68 1414.20,282.61 1412.79,280.00 C1411.18,277.02 1411.24,273.86 1412.99,268.48 C1414.60,263.56 1419.82,255.34 1423.45,252.00 C1427.21,248.54 1433.15,248.80 1444.50,252.93 C1460.62,258.80 1471.21,261.00 1483.31,261.00 C1502.44,261.00 1516.82,254.07 1522.16,242.27 C1523.88,238.47 1523.93,237.76 1522.62,235.24 C1519.55,229.29 1515.50,228.90 1498.07,232.86 C1462.16,241.01 1422.92,224.00 1408.24,193.92 C1405.99,189.29 1402.93,181.69 1401.45,177.04 C1395.27,157.53 1392.40,159.14 1380.99,188.50 C1379.93,191.22 1377.79,197.75 1374.44,208.50 C1372.89,213.45 1371.26,217.93 1370.82,218.45 C1370.37,218.97 1370.00,220.03 1370.00,220.81 C1370.00,221.58 1368.63,225.08 1366.96,228.59 C1361.77,239.46 1356.32,242.00 1338.12,242.00 C1322.05,242.00 1317.10,240.48 1312.45,234.10 C1309.14,229.55 1303.79,216.51 1298.46,200.00 C1290.31,174.77 1287.44,167.58 1283.37,162.24 C1281.66,160.00 1280.13,158.99 1278.76,159.19 C1276.08,159.59 1271.89,167.48 1265.31,184.50 C1264.46,186.70 1263.40,189.40 1262.96,190.50 C1262.52,191.60 1260.97,195.88 1259.51,200.00 C1256.66,208.04 1255.92,210.00 1250.97,222.76 C1244.44,239.59 1240.81,242.00 1222.03,242.00 C1208.58,242.00 1199.97,240.25 1196.23,236.76 C1194.90,235.52 1192.31,231.35 1190.48,227.50 C1187.28,220.77 1186.38,218.52 1182.48,207.50 C1181.50,204.75 1180.35,201.60 1179.91,200.50 C1179.48,199.40 1177.76,194.45 1176.09,189.50 C1163.65,152.63 1157.71,140.00 1152.80,140.00 C1151.79,140.00 1150.57,141.01 1150.09,142.25 C1147.39,149.27 1146.96,156.09 1147.08,190.55 C1147.21,230.42 1146.90,233.03 1141.33,238.60 C1136.15,243.78 1127.18,244.14 1107.50,239.95 C1097.84,237.89 1089.80,237.72 1083.50,239.44 C1064.51,244.62 1062.39,245.00 1052.79,245.00 C1043.46,245.00 1032.24,243.26 1025.50,240.76 C1023.85,240.15 1019.35,237.61 1015.50,235.12 C1005.33,228.54 998.79,225.08 996.40,225.04 C994.21,225.00 991.97,226.54 979.92,236.41 C970.18,244.39 968.23,244.55 944.71,239.44 C937.35,237.85 936.34,237.85 926.71,239.50 C921.09,240.46 912.67,241.89 908.00,242.67 C881.09,247.15 866.92,244.88 847.42,232.95 C830.16,222.40 820.16,209.36 813.68,188.94 C810.78,179.82 810.16,170.03 810.86,144.16 C811.17,132.49 811.07,131.70 808.92,129.41 C803.88,124.05 788.00,127.68 780.85,135.82 C777.09,140.11 772.95,148.79 771.72,155.00 C771.23,157.47 770.52,175.03 770.14,194.00 C769.49,226.50 769.33,228.73 767.33,232.50 C763.10,240.49 758.78,242.30 743.64,242.42 C733.11,242.50 732.27,242.35 728.27,239.75 C725.88,238.19 723.06,235.16 721.77,232.75 C719.63,228.75 719.50,227.34 719.46,208.50 C719.43,197.50 719.06,186.44 718.62,183.91 C717.20,175.74 719.74,176.05 661.48,176.92 C627.69,177.42 609.58,178.06 607.78,178.80 C606.24,179.44 604.79,181.00 604.44,182.39 C602.66,189.48 610.93,197.65 623.88,201.58 C632.91,204.32 655.13,202.86 662.93,199.02 C670.08,195.50 681.09,194.98 686.79,197.90 C691.59,200.37 694.39,203.43 696.92,209.00 C701.03,218.08 698.81,225.10 689.90,231.20 C686.93,233.23 684.02,234.92 683.44,234.95 C682.85,234.98 680.60,235.84 678.44,236.86 C676.27,237.89 672.02,239.42 669.00,240.27 C665.98,241.12 661.70,242.33 659.50,242.97 C651.96,245.15 630.14,245.46 619.83,243.54 C604.41,240.66 586.54,233.50 580.00,227.58 C578.62,226.34 576.15,224.40 574.50,223.27 C572.85,222.14 568.58,217.69 565.00,213.38 C556.54,203.18 551.10,198.00 548.86,198.00 C545.89,198.00 544.00,203.15 544.00,211.27 C544.00,220.21 542.52,229.45 540.43,233.50 C535.85,242.38 523.53,245.12 507.00,240.95 C489.67,236.57 488.86,236.54 477.00,239.71 C456.87,245.09 445.24,246.06 432.21,243.46 C413.24,239.67 398.10,231.16 387.27,218.21 C370.45,198.08 366.76,198.04 364.07,217.91 C361.38,237.67 356.33,242.43 338.00,242.48 C324.91,242.51 319.55,239.75 315.71,231.00 C313.12,225.10 312.81,220.53 312.94,190.33 C313.10,153.55 311.85,144.10 305.65,135.26 C302.57,130.87 299.56,128.41 294.64,126.25 C291.40,124.84 274.90,124.54 272.24,125.85 C271.28,126.32 268.75,127.55 266.62,128.58 C257.59,132.94 251.47,143.07 249.44,157.00 C249.08,159.47 248.46,176.57 248.06,195.00 C247.28,230.88 246.96,233.01 241.84,237.59 C237.65,241.33 233.05,242.51 223.00,242.40 C212.13,242.28 208.13,240.93 202.77,235.57 C197.01,229.81 195.86,224.54 194.90,199.50 C193.97,174.93 193.56,172.00 191.05,172.00 C189.61,172.00 189.13,173.64 188.17,181.75 C187.54,187.11 186.75,198.03 186.42,206.00 C185.74,222.39 184.36,228.49 180.14,233.82 C175.35,239.87 170.22,242.00 160.45,242.00 C155.86,242.00 149.49,241.29 146.30,240.43 C137.08,237.93 125.55,237.56 118.00,239.50 C104.89,242.89 93.35,244.94 87.27,244.97 C70.55,245.05 50.85,237.64 40.18,227.25 C34.28,221.49 27.00,211.28 27.00,208.75 C27.00,208.01 26.61,206.97 26.12,206.45 C25.64,205.93 24.56,203.25 23.72,200.50 C19.83,187.73 19.50,183.27 19.50,143.50 C19.50,98.07 19.84,95.40 26.53,88.52 C32.42,82.46 36.75,80.67 45.50,80.67 C53.88,80.67 58.50,82.43 62.45,87.13 C69.37,95.35 70.92,103.85 70.96,133.76 C71.01,167.49 73.03,180.13 79.63,187.97 C85.95,195.48 98.03,199.59 106.18,196.99 C119.35,192.80 125.99,186.14 131.09,172.00 C131.98,169.51 132.41,159.38 132.55,137.00 C132.78,102.83 133.34,98.44 138.45,91.07 C142.08,85.83 146.83,82.65 154.80,80.12 C158.34,78.99 167.03,80.12 169.27,81.99 C173.99,85.94 181.09,91.09 184.28,92.88 C190.75,96.51 194.52,95.60 204.50,88.04 C216.90,78.65 218.98,78.43 242.45,83.98 C251.74,86.17 253.42,86.11 269.50,82.98 C271.70,82.55 277.32,81.44 282.00,80.53 C299.05,77.18 317.21,79.28 329.73,86.06 C339.55,91.37 347.38,99.57 355.01,112.50 C361.29,123.14 364.61,127.00 367.47,127.00 C369.84,127.00 377.24,119.69 381.23,113.40 C389.72,100.02 407.79,86.45 422.00,82.78 C439.70,78.21 451.94,77.52 462.50,80.50 C482.80,86.23 486.25,86.26 490.18,80.75 C492.39,77.66 492.52,76.47 493.00,56.00 C493.58,30.99 494.33,28.37 502.08,24.03 C506.16,21.75 507.48,21.56 519.13,21.63 C530.53,21.69 532.07,21.92 534.90,23.93 C538.87,26.76 540.35,29.69 542.41,38.84 C543.81,45.03 544.04,51.89 543.90,82.34 C543.75,114.00 543.93,118.97 545.38,122.25 C548.22,128.71 550.63,127.63 559.40,116.00 C572.19,99.04 584.32,89.86 602.00,83.76 C617.37,78.45 629.35,77.21 643.93,79.42 C659.25,81.74 668.76,85.17 680.47,92.58 C691.59,99.62 698.07,106.33 709.30,122.42 C711.33,125.34 714.13,125.76 716.05,123.44 C716.77,122.58 718.15,115.43 719.12,107.56 C721.08,91.76 722.36,88.45 728.39,83.57 C732.06,80.60 732.51,80.50 741.84,80.57 C751.73,80.64 756.10,81.67 765.70,86.21 C770.92,88.68 777.30,89.16 781.10,87.37 C792.24,82.12 801.29,79.69 807.69,80.22 C812.45,80.62 813.74,81.17 815.92,83.73 C827.02,96.81 828.23,98.00 830.48,98.00 C833.63,98.00 839.68,95.32 850.27,89.25 C866.89,79.71 881.73,76.92 901.77,79.57 C921.91,82.23 927.24,81.21 931.78,73.85 C933.99,70.27 935.75,59.29 935.97,47.80 C936.11,40.80 937.27,37.54 942.21,30.25 C945.97,24.71 955.22,20.05 962.51,20.01 C967.89,19.99 976.16,23.71 979.67,27.73 C986.74,35.83 987.65,39.54 988.98,65.70 C989.91,83.89 990.27,86.49 992.58,91.82 C996.70,101.32 1000.06,101.90 1008.00,94.50 C1018.95,84.29 1040.68,78.09 1065.71,78.03 C1086.65,77.98 1098.40,80.52 1116.21,88.94 C1125.61,93.38 1133.62,95.33 1137.27,94.06 C1138.87,93.50 1142.95,90.88 1146.34,88.23 C1155.71,80.92 1159.01,79.67 1167.41,80.25 C1171.31,80.53 1175.62,81.38 1177.00,82.14 C1182.50,85.21 1185.06,87.36 1187.10,90.66 C1189.26,94.16 1198.00,115.65 1198.00,117.47 C1198.00,118.01 1199.06,121.39 1200.35,124.98 C1201.64,128.57 1203.24,133.30 1203.91,135.50 C1204.58,137.70 1205.73,141.07 1206.47,143.00 C1207.21,144.93 1208.57,149.09 1209.50,152.25 C1210.43,155.41 1211.59,158.25 1212.09,158.56 C1212.59,158.87 1213.00,159.75 1213.00,160.52 C1213.00,161.29 1214.23,163.96 1215.74,166.46 C1218.96,171.78 1221.82,172.38 1225.44,168.47 C1227.88,165.84 1228.14,165.27 1232.50,153.00 C1235.19,145.43 1235.75,143.94 1237.98,138.50 C1238.66,136.85 1240.02,133.03 1241.00,130.00 C1241.98,126.97 1243.34,123.15 1244.02,121.50 C1246.32,115.88 1246.84,114.50 1249.56,106.50 C1253.28,95.59 1256.65,88.68 1259.60,85.90 C1263.10,82.61 1269.93,81.10 1281.43,81.04 C1300.25,80.96 1303.47,84.51 1314.54,117.49 C1316.95,124.65 1320.68,135.45 1322.83,141.50 C1324.99,147.55 1327.68,155.12 1328.82,158.32 C1332.66,169.10 1336.34,173.54 1339.67,171.43 C1340.59,170.85 1343.26,166.58 1345.59,161.94 C1351.12,150.95 1352.08,148.61 1356.46,135.50 C1358.49,129.45 1360.52,123.60 1360.97,122.50 C1361.43,121.40 1363.72,114.88 1366.05,108.00 C1371.62,91.60 1374.65,87.21 1383.79,82.31 C1390.07,78.94 1401.54,79.33 1408.50,83.15 C1411.64,84.87 1420.00,92.86 1420.00,94.13 C1420.00,94.53 1420.89,95.15 1421.97,95.49 C1423.77,96.06 1428.33,94.58 1433.50,91.73 C1440.06,88.12 1451.04,83.00 1452.22,83.00 C1452.98,83.00 1454.03,82.63 1454.55,82.17 C1456.60,80.38 1470.05,78.58 1480.50,78.70 C1491.28,78.83 1496.41,79.72 1510.50,83.95 C1520.57,86.97 1530.58,86.81 1539.50,83.50 C1547.84,80.40 1562.68,79.65 1567.00,82.11 C1573.11,85.59 1575.06,87.49 1577.45,92.28 L1580.00,97.39 L1579.97,160.45 C1579.93,227.71 1579.39,237.48 1575.04,249.50 C1564.96,277.32 1546.72,292.87 1516.50,299.40 C1510.56,300.68 1486.89,303.25 1484.33,302.88 C1483.87,302.82 1477.88,302.16 1471.00,301.42 Z M1074.43,207.11 C1074.73,206.63 1076.57,205.93 1078.53,205.56 C1082.86,204.75 1090.53,197.72 1091.56,193.61 C1093.55,185.70 1088.30,179.68 1078.33,178.44 C1071.92,177.63 1061.05,178.55 1059.59,180.01 C1059.05,180.55 1057.98,181.00 1057.23,181.00 C1054.62,181.00 1049.17,186.13 1047.59,190.08 C1046.21,193.51 1046.18,194.49 1047.36,197.28 C1050.20,203.99 1057.30,207.80 1067.19,207.92 C1070.87,207.96 1074.13,207.60 1074.43,207.11 Z M471.29,197.78 C479.20,193.68 485.70,187.13 489.44,179.50 C493.26,171.68 494.21,157.96 491.53,149.12 C487.86,136.96 478.89,127.92 466.37,123.72 C450.15,118.29 430.99,127.10 422.79,143.78 C419.65,150.17 419.50,150.98 419.50,162.01 C419.50,172.98 419.66,173.86 422.71,180.02 C426.82,188.33 432.58,194.17 440.33,197.91 C445.78,200.54 447.59,200.90 455.79,200.95 C464.36,201.00 465.57,200.75 471.29,197.78 Z M912.65,198.09 C923.97,192.74 931.68,183.27 934.57,171.20 C936.96,161.18 935.97,153.18 931.06,142.81 C924.83,129.67 905.60,120.45 891.71,123.95 C884.35,125.81 879.46,128.49 873.83,133.75 C858.30,148.28 858.41,175.31 874.06,190.96 C881.41,198.31 887.58,200.72 899.50,200.90 C905.28,200.98 907.57,200.49 912.65,198.09 Z M1507.20,188.14 C1515.35,184.33 1520.06,179.66 1524.16,171.33 C1526.95,165.65 1527.36,163.83 1527.30,157.16 C1527.22,148.23 1525.28,142.49 1520.22,136.19 C1510.89,124.56 1491.39,119.02 1476.90,123.89 C1467.89,126.92 1461.74,131.08 1457.23,137.22 C1452.33,143.87 1450.48,149.68 1450.56,158.20 C1450.61,164.53 1451.06,166.18 1454.76,173.50 C1457.16,178.26 1464.06,184.94 1469.50,187.77 C1476.07,191.18 1480.61,191.96 1491.60,191.53 C1499.19,191.24 1501.78,190.67 1507.20,188.14 Z M1009.50,158.86 C1012.25,157.50 1017.26,154.94 1020.64,153.18 C1028.65,149.01 1032.48,148.27 1057.07,146.09 C1079.34,144.13 1081.76,143.40 1084.01,137.97 C1086.77,131.31 1082.50,126.17 1072.15,123.67 C1063.72,121.64 1055.25,121.54 1047.96,123.38 C1044.96,124.14 1038.81,125.34 1034.30,126.05 C1024.12,127.66 1020.58,126.78 1009.96,120.01 C999.29,113.20 996.70,113.09 992.84,119.25 C988.89,125.55 987.42,136.08 988.82,147.90 C990.27,160.05 992.07,162.40 999.50,161.77 C1002.25,161.54 1006.75,160.23 1009.50,158.86 Z M646.01,146.00 C653.40,146.00 655.21,145.66 658.10,143.72 C660.97,141.79 661.55,140.75 661.81,137.09 C662.11,132.99 661.82,132.44 656.81,127.60 C646.55,117.67 630.82,115.34 616.39,121.61 C612.40,123.34 603.82,131.66 602.19,135.37 C598.90,142.88 609.59,147.40 628.40,146.45 C633.30,146.20 641.22,146.00 646.01,146.00 Z';

const LOGO_PATH = Skia.Path.MakeFromSVGString(LOGO_D);

// Gooey threshold — multiply alpha hard and bias it down, so blurred shapes
// merge into liquid blobs (the classic SVG feColorMatrix goo). Mirrors the
// reference `0 0 0 255 -140` alpha row, normalized to Skia's 0..1 matrix.
const THRESHOLD = [
  1, 0, 0, 0, 0,
  0, 1, 0, 0, 0,
  0, 0, 1, 0, 0,
  0, 0, 0, 255, -140,
];

// Word frames the wordmark liquifies through, ending on the logo.
type Frame = { kind: 'blank' } | { kind: 'word'; text: string } | { kind: 'logo' };
const FRAMES: Frame[] = [
  { kind: 'blank' },
  { kind: 'word', text: 'get discovered' },
  { kind: 'word', text: 'get paid' },
  { kind: 'logo' },
];

// Slower + smoother so the liquid read is calm, not snappy.
const MORPH_MS = IS_ANDROID ? 850 : 1000;
const COOLDOWN_MS = 360;
const HOLD_MS = 1100;
const TOTAL_MS = 3 * (MORPH_MS + COOLDOWN_MS) + HOLD_MS;
const FALLBACK_MS = TOTAL_MS + 1500;

// Sizing — every word shares ONE scale (fit the longest phrase) so 'get paid'
// matches 'get discovered' instead of zooming up to fill the width. The logo
// is a comparable hero width.
const WORD_FIT = Math.min(W * 0.82, 540);
const LOGO_W = Math.min(W * 0.62, 450);
const LOGO_SCALE = LOGO_W / LOGO_VIEW_W;

// CSS `blur(8/f - 8)px` clamped, converted to a Skia sigma. Big when a layer
// is "off", zero when fully present.
function sigmaFor(f: number) {
  'worklet';
  const px = Math.min(8 / Math.max(f, 0.02) - 8, 64);
  return Math.max(0.7, px * 0.5);
}

// Per-frame presence over the 0..3 timeline. Frame k morphs IN over [k-1,k] and
// OUT over [k,k+1]; the last frame (k=3, the logo) stays present. Driven purely
// from the shared `t`, so frames never unmount mid-animation (no boundary flash).
function frameOpacity(v: number, k: number) {
  'worklet';
  let x: number;
  if (v <= k - 1) x = 0;
  else if (v <= k) x = v - (k - 1); // sharpening in
  else if (k === 3) x = 1; // logo holds
  else if (v <= k + 1) x = k + 1 - v; // fading out
  else x = 0;
  return Math.pow(Math.max(0, Math.min(1, x)), 0.4);
}
function frameBlur(v: number, k: number) {
  'worklet';
  if (v <= k - 1) return 64;
  if (v <= k) return sigmaFor(v - (k - 1));
  if (k === 3) return 0.7;
  if (v <= k + 1) return sigmaFor(k + 1 - v);
  return 64;
}

let CACHE_PREWARMED = false;
function prewarmImageCache() {
  if (CACHE_PREWARMED) return;
  CACHE_PREWARMED = true;
  const feedCoversHigh = feedPosts.slice(0, 12).map((p) => ({ uri: p.image, targetWidth: W, priority: 'high' as const }));
  const feedCoversRest = feedPosts.slice(12).map((p) => ({ uri: p.image, targetWidth: W, priority: 'normal' as const }));
  const feedAvatars = feedPosts.map((p) => ({ uri: p.avatar, targetWidth: 42, priority: 'high' as const }));
  const profile = [
    { uri: profileMock.avatar, targetWidth: 120, priority: 'high' as const },
    ...userFeed
      .filter((u): u is typeof u & { image: string } => typeof u.image === 'string')
      .map((u) => ({ uri: u.image, targetWidth: Math.floor(W / 3), priority: 'normal' as const })),
  ];
  prefetchImages([...feedCoversHigh, ...feedAvatars, ...profile, ...feedCoversRest]);
}

export default function Splash() {
  const { scheme } = useTheme();
  const isDark = scheme === 'dark';
  const bg = isDark ? '#0E0E10' : '#F4F1EA';
  const fg = isDark ? '#F4F1EA' : '#101012';

  const font = useFont(WORD_FONT, BASE_FONT_SIZE);

  const t = useSharedValue(0); // 0..3 across the three morph transitions
  const chromeFade = useSharedValue(0);
  const chromeProg = useSharedValue(0);
  const routedRef = useRef(false);

  // One shared word scale, derived from the longest phrase, so all words render
  // at the same glyph size.
  const wMax = font ? font.getTextWidth('get discovered') : 1;
  const wordScale = WORD_FIT / wMax;

  const finish = () => {
    if (routedRef.current) return;
    routedRef.current = true;
    const route = () => {
      const { hydrated, onboarded } = useStore.getState();
      if (!hydrated) {
        setTimeout(route, 60);
        return;
      }
      let signedIn = false;
      try {
        signedIn = !!getAuth().currentUser;
      } catch {
        signedIn = false;
      }
      if (!signedIn) router.replace('/(onboarding)/welcome');
      else if (!onboarded) router.replace('/(onboarding)/user-type');
      else router.replace('/(tabs)');
    };
    route();
  };

  useEffect(() => {
    prewarmImageCache();
    chromeFade.value = withTiming(1, { duration: 340, easing: Easing.out(Easing.cubic) });
    chromeProg.value = withTiming(1, { duration: TOTAL_MS, easing: Easing.linear });
    const fb = setTimeout(finish, FALLBACK_MS);
    return () => clearTimeout(fb);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // One continuous timeline once the font is ready. `t` eases to each integer
  // then holds (withDelay) through the cooldown, so each frame settles crisp
  // and nothing re-renders at the boundaries → no glitch.
  useEffect(() => {
    if (!font) return;
    const ease = Easing.inOut(Easing.cubic);
    t.value = withSequence(
      withTiming(1, { duration: MORPH_MS, easing: ease }),
      withDelay(COOLDOWN_MS, withTiming(2, { duration: MORPH_MS, easing: ease })),
      withDelay(COOLDOWN_MS, withTiming(3, { duration: MORPH_MS, easing: ease })),
    );
    const done = setTimeout(finish, 3 * MORPH_MS + 2 * COOLDOWN_MS + HOLD_MS);
    return () => clearTimeout(done);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [font]);

  // Each frame's opacity + blur, all derived from `t`. Frames stay mounted.
  const op1 = useDerivedValue(() => frameOpacity(t.value, 1));
  const bl1 = useDerivedValue(() => frameBlur(t.value, 1));
  const op2 = useDerivedValue(() => frameOpacity(t.value, 2));
  const bl2 = useDerivedValue(() => frameBlur(t.value, 2));
  const op3 = useDerivedValue(() => frameOpacity(t.value, 3));
  const bl3 = useDerivedValue(() => frameBlur(t.value, 3));

  const fadeStyle = useAnimatedStyle(() => ({ opacity: chromeFade.value }));
  const progressStyle = useAnimatedStyle(() => ({ width: `${chromeProg.value * 100}%` }));

  const now = new Date();
  const edition = `${String(now.getFullYear()).slice(-2)} / ${String(now.getMonth() + 1).padStart(2, '0')}`;

  return (
    <View style={[styles.root, { backgroundColor: bg }]}>
      <Canvas style={StyleSheet.absoluteFill}>
        <Fill color={bg} />
        {/* Gooey threshold wraps the morphing layers. */}
        <Group
          layer={
            <Paint>
              <ColorMatrix matrix={THRESHOLD} />
            </Paint>
          }
        >
          <FrameNode frame={{ kind: 'word', text: 'get discovered' }} font={font} fg={fg} scale={wordScale} blur={bl1} opacity={op1} />
          <FrameNode frame={{ kind: 'word', text: 'get paid' }} font={font} fg={fg} scale={wordScale} blur={bl2} opacity={op2} />
          <FrameNode frame={{ kind: 'logo' }} font={font} fg={fg} scale={wordScale} blur={bl3} opacity={op3} />
        </Group>
      </Canvas>

      {/* ── Editorial chrome — top status + bottom tagline / progress ── */}
      <Animated.View style={[styles.top, fadeStyle]} pointerEvents="none">
        <RNText style={[styles.status, { color: fg }]} allowFontScaling={false}>LOADING EDITION</RNText>
        <RNText style={[styles.status, { color: fg }]} allowFontScaling={false}>{edition}</RNText>
      </Animated.View>

      <Animated.View style={[styles.bottom, fadeStyle]} pointerEvents="none">
        <RuleDot width={W - 48} color={`${fg}22`} dotColor={staticPalette.acid} />
        <RNText
          style={[styles.tagline, { color: fg }]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.5}
          allowFontScaling={false}
        >
          GET DISCOVERED. GET CONNECTED. GET PAID.
        </RNText>
        <View style={[styles.track, { backgroundColor: `${fg}1F` }]}>
          <Animated.View style={[styles.fill, { backgroundColor: staticPalette.acid }, progressStyle]} />
        </View>
        <RNText style={[styles.copyright, { color: fg }]} allowFontScaling={false}>
          © UNDERDAWG · BUILT FOR THE UNDERRATED
        </RNText>
      </Animated.View>

      {/* Off-screen PNG warmers — 1×1, invisible. */}
      <View
        pointerEvents="none"
        style={styles.preloader}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        {[...BRAND_WORDMARK_ASSETS,
          require('@/objects/obj-1.png'),
          require('@/objects/obj-2.png'),
          require('@/objects/obj-3.png'),
          require('@/objects/obj-4.png'),
          require('@/objects/obj-5.png'),
        ].map((src, i) => (
          <RNImage key={i} source={src} style={styles.preloaderImg} />
        ))}
      </View>
    </View>
  );
}

function FrameNode({
  frame,
  font,
  fg,
  scale,
  blur,
  opacity,
}: {
  frame: Frame;
  font: SkFont | null;
  fg: string;
  scale: number; // shared word scale
  blur: SharedValue<number>;
  opacity: SharedValue<number>;
}) {
  if (frame.kind === 'blank') return null;

  if (frame.kind === 'word') {
    if (!font) return null;
    const w = font.getTextWidth(frame.text);
    return (
      <Group
        layer={
          <Paint opacity={opacity}>
            <Blur blur={blur} />
          </Paint>
        }
      >
        <Group transform={[{ translateX: CX }, { translateY: CY }, { scale }]}>
          {/* baseline placed so cap-height centers on CY */}
          <SkText x={-w / 2} y={BASE_FONT_SIZE * 0.34} text={frame.text} font={font} color={fg} />
        </Group>
      </Group>
    );
  }

  // logo — fixed hero width
  if (!LOGO_PATH) return null;
  return (
    <Group
      layer={
        <Paint opacity={opacity}>
          <Blur blur={blur} />
        </Paint>
      }
    >
      <Group transform={[{ translateX: CX }, { translateY: CY }, { scale: LOGO_SCALE }]}>
        <Group transform={[{ translateX: -LOGO_VIEW_W / 2 }, { translateY: -LOGO_VIEW_H / 2 }]}>
          <SkPath path={LOGO_PATH} color={fg} />
        </Group>
      </Group>
    </Group>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },

  top: {
    position: 'absolute',
    top: IS_ANDROID ? 28 : 58,
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: { ...T.micro, opacity: 0.6 },

  bottom: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 44,
    alignItems: 'center',
    gap: 14,
  },
  tagline: { ...T.labelLarge, opacity: 0.9, textAlign: 'center' },
  track: { alignSelf: 'stretch', height: 2, borderRadius: 1, overflow: 'hidden' },
  fill: { height: 2 },
  copyright: { ...T.micro, opacity: 0.45, textAlign: 'center' },

  preloader: { position: 'absolute', left: 0, top: 0, width: 1, height: 1, opacity: 0 },
  preloaderImg: { width: 1, height: 1 },
});
