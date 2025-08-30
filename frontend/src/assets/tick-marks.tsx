export const BigSolvedTickMark = ({ 
    className = "w-12 h-5", // Default size matching original 48x19
    ...props 
  }) => (
    <svg 
      viewBox="0 0 48 19" 
      className={className}
      {...props}
    >
      <path 
        d="M48 11.7588C47.9991 15.6246 37.2543 18.7588 24 18.7588C10.7457 18.7588 0.000873798 15.6246 0 11.7588V0.723633C0.000904709 4.5894 10.7457 7.72363 24 7.72363C37.0475 7.72363 47.6633 4.6867 47.9922 0.904297L48 0.723633V11.7588Z" 
        fill="url(#paint0_linear_631_2350)"
      />
      <defs>
        <linearGradient 
          id="paint0_linear_631_2350" 
          x1="0" 
          y1="8.24062" 
          x2="48" 
          y2="8.24062" 
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#15B800"/>
          <stop offset="0.427109" stopColor="#0CE700"/>
          <stop offset="1" stopColor="#15B800"/>
        </linearGradient>
      </defs>
    </svg>
  );

export const BigUnsolvedTickMark = ({ className = "w-10 h-2", ...props }) => (
<svg viewBox="0 0 40 8" className={className} {...props}>
    <path 
    d="M0.941406 3.15483C0.941406 1.15026 2.96587 -0.266868 4.91629 0.195931C9.03775 1.17388 14.2855 1.76025 20 1.76025C25.7145 1.76025 30.9622 1.17388 35.0837 0.195931C37.0341 -0.266868 39.0586 1.15026 39.0586 3.15483V3.15483C39.0586 4.34187 38.3288 5.41545 37.1917 5.75596C32.8322 7.06137 26.7407 7.87256 20 7.87256C13.2593 7.87256 7.16776 7.06137 2.80832 5.75596C1.67118 5.41545 0.941406 4.34187 0.941406 3.15483V3.15483Z" 
    fill="url(#paint0_linear_631_2585)"
    />
    <defs>
    <linearGradient 
        id="paint0_linear_631_2585" 
        x1="-3.99971" 
        y1="-1.25956" 
        x2="43.9997" 
        y2="-1.25956" 
        gradientUnits="userSpaceOnUse"
    >
        <stop stopColor="#B80000"/>
        <stop offset="0.427109" stopColor="#E70000"/>
        <stop offset="1" stopColor="#B80000"/>
    </linearGradient>
    </defs>
</svg>
);

export const SmallSolvedTickMark = ({ className = "w-10 h-2.75", ...props }) => (
  <svg 
    viewBox="0 0 26 10" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path 
      d="M0 4.61087C0 1.84075 2.52167 -0.249575 5.27822 0.0241816C7.7014 0.26483 10.2985 0.395688 13 0.395688C15.7015 0.395688 18.2987 0.264785 20.7219 0.0241157C23.4784 -0.249657 26 1.84064 26 4.61072V4.61072C26 6.73723 24.4876 8.57645 22.3773 8.83868C19.4965 9.19664 16.3275 9.39569 13 9.39569C9.67247 9.39569 6.50334 9.1967 3.62258 8.83871C1.51236 8.57649 0 6.73731 0 4.61087V4.61087Z" 
      fill="url(#paint0_linear_small_solved)"
    />
    <defs>
      <linearGradient 
        id="paint0_linear_small_solved" 
        x1="-11" 
        y1="1.51687" 
        x2="37" 
        y2="1.51687" 
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#15B800"/>
        <stop offset="0.427109" stopColor="#0CE700"/>
        <stop offset="1" stopColor="#15B800"/>
      </linearGradient>
    </defs>
  </svg>
);

export const SmallUnsolvedTickMark = ({ className = "w-6 h-1.5", ...props }) => (
<svg viewBox="0 0 24 5" className={className} {...props}>
    <path 
    d="M0 2.30384C0 1.09697 1.08185 0.178951 2.27929 0.329498C5.25083 0.703092 8.5399 0.910627 12 0.910645C15.4599 0.910635 18.7488 0.703138 21.7202 0.329579C22.9179 0.179005 24 1.09722 24 2.30435V2.30435C24 3.25936 23.3112 4.07802 22.3654 4.21042C19.2278 4.64967 15.7123 4.89599 12 4.896C8.28739 4.89598 4.77186 4.64912 1.63411 4.20952C0.688583 4.07705 0 3.2586 0 2.30384V2.30384Z" 
    fill="url(#paint0_linear_631_2406)"
    />
    <defs>
    <linearGradient 
        id="paint0_linear_631_2406" 
        x1="-12" 
        y1="-1.86413" 
        x2="36" 
        y2="-1.86413" 
        gradientUnits="userSpaceOnUse"
    >
        <stop stopColor="#B80000"/>
        <stop offset="0.427109" stopColor="#E70000"/>
        <stop offset="1" stopColor="#B80000"/>
    </linearGradient>
    </defs>
</svg>
);