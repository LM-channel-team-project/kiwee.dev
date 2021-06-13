import React from 'react';
import TextButton from '../Common/Button/Text';
import { signout } from 'next-auth/client';

function ProfileDetails() {
  return (
    <div>
      <TextButton
        label="LogOut"
        styleType="primary"
        size="large"
        onClick={() => signout()}
      ></TextButton>
    </div>
  );
}

export default ProfileDetails;
