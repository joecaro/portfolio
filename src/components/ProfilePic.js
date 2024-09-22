import styled from "styled-components";
import Image from "next/legacy/image";

const ProfilePic = () => {
  return (
    <PicContainer>
      <Image
        src='https://res.cloudinary.com/joecarothers/image/upload/v1650570366/misc/portfolli/Attachment-1_xmgtsi.jpg'
        layout='fill'
        objectFit='cover'
        alt='Joseph Carothers'
      />
    </PicContainer>
  );
};

export default ProfilePic;

const PicContainer = styled.div`
  width: clamp(100px, 10vw, 600px);
  height: clamp(100px, 10vw, 400px);
  overflow: hidden;
  position: relative;
  border-radius: 1rem;
  border: 4px solid var(--blue600);
`;
