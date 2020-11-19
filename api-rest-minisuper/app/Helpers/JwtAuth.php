<?php

/**
 * Author: OCHOA HERNANDEZ CHRISTIAN YESAEL
 * Web page: champrogrammers.github.io/web 
 */

namespace App\Helpers;

use Firebase\JWT\JWT;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;
use App\Models\User;

class JwtAuth {

    //Secret key for JWT
    private $key;

    public function __construct() {
        $this->key = '20110469_CET_PWD_SECRET_ENCRYPTION';
    }

    /**
     * 
     * @param type $password
     * this function need encrypted password of user as param for decrypt
     * 
     * @return type $decryptedPassword or error json response
     * return the desencrypted password of user
     */
    private function decryptPassword($password) {
        try {
            $decryptPassword = Crypt::decryptString($password);
            return $decryptPassword;
        } catch (DecryptException $e) {
            return response()->json($e, 400);
        }
    }

    /**
     * 
     * @param type $email is the email of user
     * @param type $password is the password of that user
     * @return object return a response object if all was fine return the user
     * token
     */
    public function signIn($email, $password) {

        $user = User::where('Email', $email)->first();

        if (!is_null($user)) {


            if ($password === $this->decryptPassword($user->Password)) {

                $payload = array(
                    'id' => $user->ID,
                    'name' => $user->Name,
                    'lastName' => $user->LastName,
                    'email' => $user->Email,
                    'phone' => $user->Phone,
                    'address' => $user->Address,
                    'iat' => time(),
                    'exp' => time() + (24 * 60 * 60)
                );

                $jwt = JWT::encode($payload, $this->key);

                $response = array(
                    'message' => 'Welcome back ' . $user->Name . ' ' . $user->LastName,
                    'status' => 'success',
                    'code' => 200,
                    'token' => $jwt
                );

                return response()->json($response, $response['code']);
            } else {
                $response = array(
                    'message' => 'The email or password are incorrect please '
                    . 'verify the fields',
                    'status' => 'error',
                    'code' => 400
                );

                return response()->json($response, $response['code']);
            }
        } else {
            $response = array(
                'message' => 'The email is not registed already',
                'status' => 'error',
                'code' => 400
            );

            return response()->json($response, $response['code']);
        }
    }

    /**
     * 
     * @param string $jwt is the web token
     * @param bool   $userAuth is an optional param if its true return the user
     *                         data that contains the token.
     * @return boolean return flag that says if the token is valid or not
     */
    public function checkToken($jwt, $userAuth = '') {
        $flag = false;
        $decoded = '';

        if (isset($userAuth) && $userAuth != '') {
            if ($userAuth != true) {
                $userAuth = false;
            }
        } else {
            $userAuth = false;
        }

        try {
            $decoded = JWT::decode($jwt, $this->key, array('HS256'));
        } catch (\UnexpectedValueException $e) {
            $flag = false;
        } catch (\Exception $e) {
            $flag = false;
        }

        if (is_object($decoded) && !is_null($decoded) && isset($decoded->id)) {
            $flag = true;
        }

        if ($userAuth != false && $flag == true) {
            return $decoded;
        }

        return $flag;
    }

    /**
     * 
     * @param type $jwt this function a jwt to verify
     * @return boolean return a flag that says if the user is admin or not
     */
    public function isAdmin($jwt) {
        
        $flag = false;
        
        if (!is_null($jwt)) {
            
            $decodedToken = '';

            try {
                $decodedToken = JWT::decode($jwt, $this->key, array('HS256'));
            } catch (\UnexpectedValueException $e) {
                $flag = false;
            } catch (\Exception $e) {
                $flag = false;
            }
            
            if (isset($decodedToken->id)) {
                $id = $decodedToken->id;
                $query = User::where('ID', $id)->first();
                $userType =  $query->FK_TypeUser;
                if ($userType === 1) {
                    $flag = true;
                }
            }
            
        }
        else {
            $flag = false;
        }
        
        return $flag;
        
    }

}
