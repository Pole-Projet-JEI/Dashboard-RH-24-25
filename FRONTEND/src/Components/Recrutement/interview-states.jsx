import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export const statuses = {
    ALL : {
        title:'All',
        icon : null,
        id : 'ALL'
    },
    CONFIRMED : {
        title:'Confirmed',
        icon: CheckCircleOutlineRoundedIcon,
        id : 'CONFIRMED'
    },
    DELAYED : {
        title:'Delayed',
        icon: RestoreOutlinedIcon,
        id : 'DELAYED'
    },
    CANCELLED : {
        title:'Cancelled',
        icon: CancelOutlinedIcon,
        id : 'CANCELLED'
    }
}