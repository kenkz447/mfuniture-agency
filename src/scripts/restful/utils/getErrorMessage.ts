export async function getErrorMessage(response: Response | Error) {
    if (response instanceof Error) {
        return response.toString();
    }

    let errorMessage = 'Error!';
    const json = await response.json();
    errorMessage = json.message;
    
    return errorMessage;
}