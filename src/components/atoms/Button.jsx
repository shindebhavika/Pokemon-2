import { Link } from "react-router-dom";

const colorMap = {
  yellow: 'bg-yellow-400 hover:bg-yellow-500',
  red: 'bg-red-400 hover:bg-red-500',
  blue: 'bg-blue-400 hover:bg-blue-500',
  green: 'bg-green-400 hover:bg-green-500',
  // Add more as needed
};

const Button = ({ width = 'w-full', text = 'Click Me', onClick, to, Icon, color = 'yellow' }) => {
  

  const colorClasses = colorMap[color] || colorMap['yellow'];
  const baseClasses = `inline-flex items-center px-3 py-1 ${colorClasses} text-white font-semibold rounded transition ${width} `;
  const buttonContent = (
    <>
      
      {text}
      {Icon && <Icon className="ml-2 text-3xl mt-1" />}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={baseClasses} onClick={onClick}>
        {buttonContent}
      </Link>
    );
  } else {
    return (
      <button className={baseClasses} onClick={onClick} type="button">
        {buttonContent}
      </button>
    );
  }
};


export default Button;