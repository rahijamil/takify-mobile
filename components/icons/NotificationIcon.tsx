import React from 'react';
import Svg, {  Path } from 'react-native-svg';

const NotificationIcon = () => {
  return (
    <Svg height="60" width="60" viewBox="0 0 24 24">
      <Path
        d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-3v-5c0-3.07-1.64-5.64-4.5-6.32V6c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v1.68C7.63 8.36 6 10.92 6 14v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"
        fill="#2E86C1"
      />
    </Svg>
  );
};

export default NotificationIcon;
