const TransactionsList = ({ transactions }) => {
    return (
      <div>
        {transactions.map((transaction, index) => (
          <div key={index} className="transaction-item flex justify-between p-2 border-b border-gray-200">
            <div className="transaction-date">{transaction.date}</div>
            <div className="transaction-desc">{transaction.description}</div>
            <div className="transaction-amount">{transaction.amount}</div>
          </div>
        ))}
      </div>
    );
  };
  
  export default TransactionsList;