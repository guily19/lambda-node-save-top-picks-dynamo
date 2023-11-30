import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const dynamodb = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamodb);

export const handler = async message => {
  console.log(message);

  if (message.body) {
    let pick = JSON.parse(message.body);
    let params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        id: pick.id,
        set: pick.set,
        format: pick.format,
        cards: pick.cards,
        username: pick.username
      }
    };
    console.log(`Adding pick to table ${process.env.TABLE_NAME}`);
    
    const command = new PutCommand(params);

    const response = await docClient.send(command);
    console.log(response);
  
    console.log(`New pick added to the inventory`);
      
    }
    
  return {
    statusCode: 200,
    headers: {"Access-Control-Allow-Origin": '*'},
    body: JSON.stringify({})
  };

};
