// Actions
const GET_ALL_PRODUCT = "schedule/GET-ALL-PRODUCT";
const GET_ALL_PRODUCT_SUCCESS = "schedule/GET-ALL-PRODUCT_SUCCESS";
const GET_ALL_PRODUCT_FAIL = "schedule/GET-ALL-PRODUCT_FAIL";

const CREATE_SCHEDULE = "schedule/CREATE-SCHEDULE";
const CREATE_SCHEDULE_SUCCESS = "schedule/CREATE-SCHEDULE_SUCCESS";
const CREATE_SCHEDULE_FAIL = "schedule/CREATE-SCHEDULE_FAIL";

const initialState = {
    productData: [],
    productDataStatus: false,
    messageGetProduct: "",
    createScheduleData: {},
    createScheduleStatus: false,
    messageCreate: ""
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        // GET ALL PRODUCT
        case GET_ALL_PRODUCT:
            return {
                ...state,
                productData: [],
                productDataStatus: false,
                messageGetProduct: ""
            };
        case GET_ALL_PRODUCT_SUCCESS:
            return {
                ...state,
                productData: action.payload.data.products,
                productDataStatus: true,
                messageGetProduct: "success"
            };
        case GET_ALL_PRODUCT_FAIL:
            return {
                ...state,
                messageGetProduct: "failed"
            };
        // END GET ALL PRODUCT

        // CREATE SCHEDULE
        case CREATE_SCHEDULE:
            return {
                ...state,
                createScheduleData: {},
                createScheduleStatus: false,
                messageCreate: ""
            };
        case CREATE_SCHEDULE_SUCCESS:
            return {
                ...state,
                createScheduleData: action.payload.data,
                createScheduleStatus: false,
                messageCreate: "success"
            };
        case CREATE_SCHEDULE_FAIL:
            return {
                ...state,
                messageCreate: "failed"
            };
        // END CREATE SCHEDULE
        default:
            return state;
    }
}

// Action Creators
export function getAllProduct() {
    return {
        type: GET_ALL_PRODUCT,
        payload: {
            request: {
                method: "GET",
                url:
                    "https://gp6f082c2a.execute-api.ap-southeast-1.amazonaws.com/dev/active",
                headers: {}
            }
        }
    };
}

export function createSchedule(data) {
    return {
        type: CREATE_SCHEDULE,
        payload: {
            request: {
                method: "POST",
                url:
                    "https://3sf7ewgvy2.execute-api.ap-southeast-1.amazonaws.com/Prod/post-schedule",
                headers: {},
                data: data
            }
        }
    };
}
