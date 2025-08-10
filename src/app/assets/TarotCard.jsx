export function TarotFront({ playlistname, profilepicture}) {
  return (
    <svg width="400" height="666" viewBox="0 0 400 666" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <g filter="url(#filter0_d_2004_21)">
        <g filter="url(#filter1_d_2004_21)">
          <g filter="url(#filter2_d_2004_21)">
            <rect x="4" width="391.024" height="658" rx="20" fill="#FFFDED" />
          </g>
        </g>
        <rect
          x="37.2493"
          y="43.0182"
          width="326.059"
          height="585.636"
          fill="#FCFAE9"
          stroke="#0E0E0E"
          strokeWidth="4"
        />
        <line x1="37.2493" y1="102.317" x2="363.3083" y2="102.317" stroke="black" strokeWidth="4" />
        <line x1="37.2493" y1="546.939" x2="363.3083" y2="546.939" stroke="black" strokeWidth="4" />
      </g>
      <text
        fill="black"
        xmlSpace="preserve"
        style={{ whiteSpace: 'pre' }}
        fontFamily="Cormorant Garamond"
        fontSize={30}
        fontWeight="bold"
        letterSpacing="0em"
      >
        <tspan x="175.759" y="82.555">IXV</tspan>
      </text>
      <text
        fill="black"
        xmlSpace="preserve"
        style={{ whiteSpace: 'pre' }}
        fontFamily="Cormorant Garamond"
        fontSize={30}
        fontWeight="bold"
        letterSpacing="0em"
      >
      </text>
      <foreignObject x="50" y="570" width="300" height="100">
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            fontFamily: 'Cormorant Garamond',
            fontWeight: 'bold',
            fontSize: '24px',
            color: 'black',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            textAlign: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          {playlistname ? playlistname : ''}
        </div>
      </foreignObject>
      <foreignObject x="70" y="130" width="256" height="393">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: "100%", height: "100%"}}>
          <img
            src={profilepicture || <rect x="70" y="130" width="256" height="393" fill="#C0ABF6" /> }
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover",  filter: "contrast(1.5) brightness(1.2) saturate(0.8) grayscale(0.5)", borderRadius:10 }}
          />
        </div>
      </foreignObject>
      {/* <rect x="70" y="130" width="256" height="393" fill="#C0ABF6" /> */}
      <defs>
        <filter
          id="filter0_d_2004_21"
          x="0"
          y="0"
          width="399.024"
          height="666"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.121682 0 0 0 0 0.0140052 0 0 0 0 0.222412 0 0 0 0.25 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2004_21" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2004_21" result="shape" />
        </filter>
        <filter
          id="filter1_d_2004_21"
          x="0"
          y="0"
          width="399.024"
          height="666"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2004_21" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2004_21" result="shape" />
        </filter>
        <filter
          id="filter2_d_2004_21"
          x="0"
          y="0"
          width="399.024"
          height="666"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2004_21" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2004_21" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

export function TarotBack({ fortune}) {
  return (
    <svg width="400" height="666" viewBox="0 0 400 666" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_2002_72)">
        <g filter="url(#filter1_d_2002_72)">
          <g filter="url(#filter2_d_2002_72)">
            <rect x="4" width="391.024" height="658" rx="20" fill="#FFFDED" />
          </g>
        </g>
        <rect
          x="37.2493"
          y="43.0182"
          width="326.059"
          height="585.636"
          fill="#FCFAE9"
          stroke="#0E0E0E"
          strokeWidth="4"
        />
      
        <foreignObject x="48" y="220" width="300" height="560">
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            fontFamily: 'Cormorant Garamond',
            fontWeight: 200,
            fontSize: '20px',
            color: 'black',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            textAlign: 'center',
            width: '100%',
            height: '100%',
            overflow: 'auto',
          }}
        >
          {fortune? fortune : ''}
        </div>
      </foreignObject>
      </g>
      <defs>
        <filter
          id="filter0_d_2002_72"
          x="0"
          y="0"
          width="399.024"
          height="666"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.121682 0 0 0 0 0.0140052 0 0 0 0 0.222412 0 0 0 0.25 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2002_72" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2002_72" result="shape" />
        </filter>
        <filter
          id="filter1_d_2002_72"
          x="0"
          y="0"
          width="399.024"
          height="666"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2002_72" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2002_72" result="shape" />
        </filter>
        <filter
          id="filter2_d_2002_72"
          x="0"
          y="0"
          width="399.024"
          height="666"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2002_72" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2002_72" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}
