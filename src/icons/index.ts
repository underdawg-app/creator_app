// Drop-in replacement for `@expo/vector-icons` that exposes Ionicons with the
// `glyphMap` static so existing `keyof typeof Ionicons.glyphMap` types resolve.
import IoniconsCore from 'react-native-vector-icons/Ionicons';
import glyphMap from 'react-native-vector-icons/glyphmaps/Ionicons.json';

export const Ionicons = Object.assign(IoniconsCore, { glyphMap });
