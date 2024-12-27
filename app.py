from flask import Flask, render_template, jsonify
import sqlite3

app = Flask(__name__)

# Route to render the main HTML page
@app.route('/')
def home():
    return render_template('index.html')
@app.route('/data', methods=['GET'])
def Getting_Data():
    data=[]
    conn = sqlite3.connect('data/SupermarketData.db')
    cursor = conn.cursor()
    cursor.execute("Select * FROM SalesData  Limit 60")
    rows = cursor.fetchall()
    for row in rows:
        data_dict={
            'Store_ID':row[1],
            'Store_Area':row[2],
            'Items_Available':row[3],
            'Daily_Customer_Count':row[4],
            'Store_Sales': row[5]  
        }
        data.append(data_dict)
    conn.close()
    print(data)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
