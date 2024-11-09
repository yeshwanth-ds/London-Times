import React from "react";

const Input = ({ icon: Icon, ...props }) => {
	return (
		<div className='relative mb-6'>
			{/* Icon section with the updated color */}
			<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
				<Icon className='w-5 h-5 text-[#00F260]' /> {/* Updated the icon color */}
			</div>
			<input
				{...props}
				className='w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 transition duration-200
					bg-[#005C97] text-white placeholder-white focus:border-[#00F260] 
					focus:ring-2 focus:ring-[#00F260]'
				placeholder={props.placeholder} 
			/>
		</div>
	);
};

export default Input;
