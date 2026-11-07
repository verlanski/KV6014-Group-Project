//Here i will be creating an admin route for when a user tries to go to admin page
//I will check if the user is an admin and if they are not i will redirect them to the home page
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../../backend/config/supabase";

