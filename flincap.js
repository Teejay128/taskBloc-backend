const baseURL = "https://flincap.app/api";
const secKey = "sk_live_ad07117c61fd291ddee8556f7590bfd27317723faaadef4cdc";
const pubKey = "pk_live_5734350817b1b1c702c6c195bcd722606a22f9a1fce73679fa";
const authToken = atob(`${secKey}:${pubKey}`);

const apiClient = new FlincapApiClient(baseURL, authToken);

// Get rate
apiClient
	.getRate("USDT", "NGN")
	.then((response) => {
		console.log(response.data); // Process the rate data here
	})
	.catch((error) => {
		console.error(error.message, error.code);
	});

// Create transaction
const transactionData = {
	selectedCrypt: "USDT",
	selectedFiat: "NGN",
	email: "test@example.com",
	bankName: "Test Bank",
	bankCode: "12345",
	accNum: "9876543210",
	accName: "John Doe",
	amountFiat: "5000",
	amountCrypt: "100",
	rate: "50",
};

apiClient
	.createTransaction(transactionData)
	.then((response) => {
		console.log(response.data); // Process the transaction response here
	})
	.catch((error) => {
		console.error(error.message, error.code);
	});

// And so on for other API endpoints...
