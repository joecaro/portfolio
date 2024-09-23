import Image from "next/image";

const ProfilePic = () => {
	return (
		<div className="relative w-[clamp(100px,10vw,600px)] h-[clamp(100px,10vw,400px)] overflow-hidden rounded-xl border-4 border-blue-600">
			<Image
				src="https://res.cloudinary.com/joecarothers/image/upload/v1650570366/misc/portfolli/Attachment-1_xmgtsi.jpg"
				layout="fill"
				objectFit="cover"
				alt="Joseph Carothers"
			/>
		</div>
	);
};

export default ProfilePic;