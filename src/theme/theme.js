const darkModeThemeColour = '#141617';
const globalThemeColour = '#69a9e5';

export const theme = {
  LIGHT: {
    primaryThemeColour: globalThemeColour,
    siteBg: '#f9f8f7',
    text: '#080708',

    headerBg: '#f9f8f7',
    headerDropShadow: '0 0.5em 2em 0 rgba(85, 85, 85, 0.06)',
    headerNavLinkColour: darkModeThemeColour,
    headerBorderColour: '#e1e4e8',

    cardHoverColour: '#f7f7f7',
    cardBorder: '1px solid #e1e4e8',
    cardDropShadow: '0.5rem 0.5rem 1rem 0 rgba(85, 85, 85, 0.03)',
    cardBgColour: 'white',

    linkButtonSmallBorder: `2px ${globalThemeColour} solid`,

    linkButtonHoverColour: '#f9f8f7',
    linkButtonBorder: '0.5rem 0.5rem 1.5rem 0 rgba(0, 0, 0, 0.2)',
    linkButtonHoverBorder: `1px ${globalThemeColour} solid`,
    linkButtonTextColour: globalThemeColour,

    iconColour: globalThemeColour,
    socialMediaLinkBgColour: '#f9f8f7',

    postTextColour: '#41484f',
  },
  DARK: {
    primaryThemeColour: globalThemeColour,
    siteBg: darkModeThemeColour,
    text: '#f9f8f7',

    headerBg: '#1d1d1d',
    headerDropShadow: '0 0.6em 3em 0 rgba(0, 0, 0, 0.2)',
    headerNavLinkColour: '#f9f8f7',
    headerBorderColour: 'black',

    cardHoverColour: '#444242',
    cardBorder: `1px ${globalThemeColour} solid`,
    cardDropShadow: '0.5rem 0.5rem 1rem 0 rgba(0, 0, 0, 0.01)',
    cardBgColour: '#262525',

    linkButtonSmallBorder: '2px #f9f8f7 solid',

    linkButtonHoverColour: darkModeThemeColour,
    linkButtonBorder: '0.5rem 0.5rem 1.5rem 0 rgba(85, 85, 85, 0.12)',
    linkButtonHoverBorder: '1px #f9f8f7 solid',
    linkButtonTextColour: '#f9f8f7',

    iconColour: 'white',
    socialMediaLinkBgColour: darkModeThemeColour,

    postTextColour: '#ced4da',
  },
};
