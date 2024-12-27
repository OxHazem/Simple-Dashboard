import sqlite3
import pandas as pd

conn=sqlite3.connect("D:\DownLoad\projects\Dashboard\data\SupermarketData.db")
c=conn.cursor()

c.execute("DROP TABLE IF EXISTS SalesData")

c.execute("""CREATE TABLE SalesData
              ( Store_ID INTEGER PRIMARY KEY, 
                Store_Area INTEGER ,
                Items_Available INTEGER,
                Daily_Customer_Count INTEGER,
                Store_Sales INTEGER
              )
          """)

conn.commit()

data=pd.read_csv("D:\DownLoad\projects\Dashboard\data\csvdata\Stores.csv")
data.to_sql("SalesData",con=conn,if_exists= "replace")

c.execute("""Select * FROM SalesData Limit 100""")    
print(c.fetchall())




