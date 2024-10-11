import toast from "react-hot-toast";

interface FetchType {
    route: string,
    method: 'POST' | 'GET',
    data?: object
}

const fetchHandler = async (data: FetchType) => {
    try {
        if (data.method === 'POST') {
            const response = await fetch(`/api/${data.route}`, {
                method: data.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data.data || {})
            });
            const result = await response.json()
            if (!result.error) {
                return result;
            } else {
                throw new Error(result.error?.message || result.error || 'Internal server error')
            }
        } else if (data.method === 'GET') {
            const response = await fetch(`/api/${data.route}`);
            const result = await response.json()
            if (!result.error) {
                return result;
            } else {
                throw new Error(result.error?.message || result.error || 'Internal server error')
            }
        }
    } catch (error: any) {
        toast.error(error.message || error || 'Internal server error')
        return { error: error.message || error || 'Internal server error', success: false }
    }
};

export default fetchHandler