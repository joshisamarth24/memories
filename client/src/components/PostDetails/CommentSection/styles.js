import { makeStyles } from "@mui/styles";

export default makeStyles({
    loadingPaper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '15px',
        height: '39vh',
      },
      commentsOuterContainer: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      commentsInnerContainer: {
        height: '200px',
        overflowY: 'auto',
        marginRight: '30px',
      },
});