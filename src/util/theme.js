export default {
    palette: {
        primary: {
            light: "#ed4b82",
            main: "#e91e63",
            dark: "#a31545",
            contrastText: "#fff"
        },
        secondary: {
            light: "#33cbb7",
            main: "#00bfa5",
            dark: "#008573",
            contrastText: "#fff"
        }
    },
    spreadThis: {
        typography: {
            useNextVariants: true
        },
        form: {
            textAlign: "center"
        },
        icon: {
            width: 90,
            height: 90,
            margin: "20px auto"
        },
        pageTitle: {
            margin: "10px auto"
        },
        textField: {
            margin: "10px auto"
        },
        button: {
            marginTop: 20,
            position: "relative"
        },
        customError: {
            color: "red",
            fontSize: "0.8rem",
            marginTop: 10
        },
        progress: {
            position: "absolute"
        }
    },
    userProfile: {
        profile: {
            "& .image-wrapper": {
                textAlign: "center",
                position: "relative",
                "& button": {
                    position: "absolute",
                    top: "80%",
                    left: "70%"
                }
            },
            "& .profile-image": {
                width: 200,
                height: 200,
                objectFit: "cover",
                maxWidth: "100%",
                borderRadius: "50%"
            },
            "& .profile-details": {
                textAlign: "center",
                "& span, svg": {
                    verticalAlign: "middle"
                },
                "& a": {
                    color: "#00bcd4"
                }
            },
            "& hr": {
                border: "none",
                margin: "0 0 10px 0"
            },
            "& svg.button": {
                "&:hover": {
                    cursor: "pointer"
                }
            }
        },
        buttons: {
            textAlign: "center",
            "& a": {
                margin: "20px 10px"
            }
        }
    },
    separator: {
        invisibleSeparator: {
            border: 'none',
            margin: 4
        },
        visibleSeparator: {
            width: '100%',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            marginBottom: 20
        }
    }
}
