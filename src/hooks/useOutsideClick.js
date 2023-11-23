import React from 'react';

const useOutsideClick = () => {
	const [visible, setVisible] = React.useState(false);
	const ref = React.useRef(null);
	const buttonRef = React.useRef(null);

	const handleMouseClick = React.useCallback(({ target }) => {
		if (
			typeof buttonRef.current?.contains === 'function' &&
			!buttonRef.current?.contains(target) &&
			typeof ref.current?.contains === 'function' &&
			!ref.current?.contains(target)
		) {
			setVisible(false);
		}
	}, []);

	React.useEffect(() => {
		document.addEventListener('click', handleMouseClick, true);

		return () => document.removeEventListener('click', handleMouseClick, true);
	}, [handleMouseClick]);

	return {
		buttonRef,
		ref,
		setVisible,
		visible,
	};
};

export default useOutsideClick;
