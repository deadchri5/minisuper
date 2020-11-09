<?php

/*
 * Author: Christian Yesael Ochoa Hernandez
 * Web page: champrogrammers.github.io/web 
*/

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Crypt;
use Haruncpi\LaravelIdGenerator\IdGenerator;
//Import User Model
use App\Models\User;

class UserController extends Controller {

    public function signIn(Request $request) {
        $json = $request->input('json', null);
        $params = json_decode($json);
        
        if ($params != NULL) {
            $params = json_decode($json);
            $jwt = new \JwtAuth();
            return $jwt->signIn($params->email, $params->password);
        }
        else {
            $response = array (
                'message'   => 'The recaved data has in incorrect format',
                'status'    => 'error',
                'code'      => 400
            );
            
            return response()->json($response, $response['code']);
        }
    }
    
    public function login(Request $request) {
        $json = $request->input('json', null);
        $params = json_decode($json);
        if (!is_null($params)) {
            $validateToken = new \JwtAuth();
            $validateToken = $validateToken->signIn($params->email, 
                                                            $params->password);
            return response()->json($validateToken, $validateToken['code']);
        }
        else {
            $response = array (
                'message'   => 'Wrong data structure, please try again.',
                'status'    => 'error',
                'code'      => 400
            );
        }
        
        return response()->json($response, $response['code']);
    }

    public function registerUser(Request $request) {
        //Pick the user data
        $json = $request->input('json', null);
        $params = json_decode($json, true);

        if (!empty($params)) {
            //validate user data
            $validateData = Validator::make($params, [
                        'name'      =>  'required|alpha',
                        'lastName'  =>  'required|alpha',
                        'email'     =>  'required|email|unique:user',
                        'address'   =>  'required',
                        'phone'     =>  'required|numeric|unique:user',
                        'password'  =>  'required'
            ]);

            if ($validateData->fails()) {
                return response()->json($validateData->errors(), 400);
            } else {
                //encript password
                $encryptPassword = Crypt::encryptString($params['password']);
                //ID generate
                $id = IdGenerator::generate(['table' => 'user', 'length' => 8,
                            'prefix' => date('y')]);
                //register user
                $user = new User();
                $user->ID = $id;
                $user->Name = $params['name'];
                $user->LastName = $params['lastName'];
                $user->Age = 18;
                $user->Email = $params['email'];
                $user->Address = $params['address'];
                $user->Phone = $params['phone'];
                $user->Password = $encryptPassword;
                $user->FK_TypeUser = 2;
                $user->save();

                $responseArray = array(
                    'message' => 'User has been created successfully',
                    'status' => 'success',
                    'code' => 200,
                    'user' => $user
                );

                return response()->json($responseArray, $responseArray['code']);
            }
        } else {
            $responseArray = array(
                'message' => 'Data is empty or corrupt',
                'status' => 'error',
                'code' => 400
            );
            return response()->json($responseArray, $responseArray['code']);
        }
    }
    
    public function updateUser(Request $request) {
        
        $token = $request->header('Authorization', null);
        $JwtAuth = new \JwtAuth();
        $getToken = $JwtAuth->checkToken($token);
        
        if ($getToken){
            $json = $request->input('json', null);
            $params = json_decode($json, true);
            
            if (!is_null($params)) {
                $userLoggedData = $JwtAuth->checkToken($token, true);
                
                $validate = Validator::make($params, [
                    'Name'      =>  'required|alpha',
                    'LastName'  =>  'required|alpha',
                    'Email'     =>  'required|email|unique:user,email,'.$userLoggedData->id,
                    'Phone'     =>  'required|numeric|unique:user,phone,'.$userLoggedData->id
                ]);
                
                //Ignore (eliminate) data in case of user send it
                unset($params['ID']);
                unset($params['created_at']);
                unset($params['FK_TypeUser']);
                unset($params['Password']);
                
                if (!$validate->fails()){
                    $userUpdate = User::where('ID', $userLoggedData->id)->update($params);
                    //update data
                    $response = array (
                        'message'   => 'Your profile has been update successfully',
                        'status'    => 'success',
                        'code'      => 200
                    );
                }
                else {
                    echo 'hay errores';
                    die();
                    return response()->json($validate->errors(), 400);
                }
                
            }
            else {
                $response = array (
                    'message'   =>  'Invalid data please fill the fields with'
                                                           .' differt values.',
                    'response'  =>  'error',
                    'code'      => 400
                );
            }
        }
        
        else {
            
            $response = array (
                'message'   => 'Invalid token, please sign in again to resolve'.
                                                                ' this problem',
                'status'    => 'error',
                'code'      => 400
            );
        }
        
        return response()->json($response, $response['code']);
    }

}
