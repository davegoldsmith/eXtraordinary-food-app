import React, { useState } from 'react';
import { InputLabel, ListItem, Select, MenuItem } from '@mui/material';

// very similar to the <TextInput> props - see comments there.
export interface SelectProps {
	id: string;
	name: string;
	label: string;
	options: string[];
	value: string;
	onChangeHandler: (newValue: string) => void;
}

export const SelectInput: React.FC<SelectProps> = ({
	id,
	name,
	label,
	onChangeHandler,
	value,
	options
}) => {
	const selectLabel = `${label}-select-label`;
	return (
		<>
			<ListItem>
				<InputLabel id={selectLabel}>{label}</InputLabel>
				<Select
					//multiple
					value={value}
					onChange={
						(e) => {
							onChangeHandler(e.target.value)
						}}
					labelId={selectLabel}
					label={label}
					size='small'
					fullWidth
				>
					{options.map((value, index) => {
						return (

							<MenuItem key={`select-${name}-o-${index}`} value={value}>
								{value}
							</MenuItem>
						)
					})}
				</Select>
			</ListItem>
		</>
	);
};
