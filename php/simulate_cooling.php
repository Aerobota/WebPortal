<?php

if(isset($_POST['building_climatic_zone'])) $building_climatic_zone = $_POST['building_climatic_zone']; else return;
if(isset($_POST['building_pilot'])) $building_pilot = $_POST['building_pilot']; else return;
if(isset($_POST['building_refurbishm'])) $building_refurbishm = $_POST['building_refurbishm']; else return;
if(isset($_POST['building_typology'])) $building_typology = $_POST['building_typology']; else return;
if(isset($_POST['building_contructionyear'])) $building_contructionyear = $_POST['building_contructionyear']; else return;
if(isset($_POST['building_floors'])) $building_floors = $_POST['building_floors']; else return;
if(isset($_POST['building_per_diff'])) $building_per_diff = $_POST['building_per_diff']; else return;
if(isset($_POST['building_height_val'])) $building_height_val = $_POST['building_height_val']; else return;
if(isset($_POST['building_area'])) $building_area = $_POST['building_area']; else return;
if(isset($_POST['building_ave_floor'])) $building_ave_floor = $_POST['building_ave_floor']; else return;
if(isset($_POST['building_irradiation'])) $building_irradiation = $_POST['building_irradiation']; else return;
if(isset($_POST['building_delta_u'])) $delta_u_bridge = $_POST['building_delta_u']; else return;
if(isset($_POST['building_position'])) $building_position = $_POST['building_position']; else return;
if(isset($_POST['buildinganalysis_edit_mode'])) $buildinganalysis_edit_mode = $_POST['buildinganalysis_edit_mode']; else return;

    if(is_int(intval($buildinganalysis_edit_mode )) && is_int(intval($building_climatic_zone )) && is_int(intval($building_pilot)) && is_int(intval($building_contructionyear)) && is_int(intval($building_floors))){

        $SCENARIO_1_DATA = new PDO('pgsql:host=localhost;port=5432;dbname=SUNSHINE_SCENARIO_1_DATA', 'u.di.staso', 'password');

        if(($building_contructionyear>=0) && ($building_contructionyear<=date("Y"))){
        
        	$EPI = 0;

            if($building_contructionyear>=1900){

               if($buildinganalysis_edit_mode == 0){


                    $stmt = $SCENARIO_1_DATA->prepare("SELECT u_roof, u_wall, u_floor, u_window, p_window, cooling_start, cooling_end, theta_s FROM u_values, climatic_zones, pilots where refurbishm = :refurbishm AND building_typology = :building_typology AND (:building_contructionyear BETWEEN begin_year AND end_year) AND u_values.climatic_zone = :building_climatic_zone AND climatic_zones.id = :building_climatic_zone AND pilots.id = :building_pilot");
                    $stmt->bindValue(':building_pilot', $building_pilot, PDO::PARAM_INT);
                    $stmt->bindValue(':refurbishm', $building_refurbishm, PDO::PARAM_STR);
                    $stmt->bindValue(':building_typology', $building_typology, PDO::PARAM_INT);
                    $stmt->bindValue(':building_contructionyear', $building_contructionyear, PDO::PARAM_INT);
                    $stmt->bindValue(':building_climatic_zone', $building_climatic_zone, PDO::PARAM_INT);

                    $stmt->execute();
	
                    $row = $stmt->fetch(PDO::FETCH_NUM, PDO::FETCH_ORI_NEXT);

                    $u_roof = $row[0];
                    $u_wall = $row[1];
                    $u_floor = $row[2];
                    $u_window = $row[3];
                    $p_window = $row[4];
                    $building_heating_start = $row[5];
                    $building_heating_end = $row[6];
                    $building_theta = $row[7];
                    $building_comfort_avg = 26;

                    $stmt = null;
            	}
            	else{
            		if(isset($_POST['building_u_roof'])) $u_roof = $_POST['building_u_roof']; else return;
            		if(isset($_POST['building_u_wall'])) $u_wall = $_POST['building_u_wall']; else return;
            		if(isset($_POST['building_u_floor'])) $u_floor = $_POST['building_u_floor']; else return;
            		if(isset($_POST['building_u_window'])) $u_window = $_POST['building_u_window']; else return;
            		if(isset($_POST['building_p_window'])) $p_window = $_POST['building_p_window']; else return;
            		if(isset($_POST['building_heating_start'])) $building_heating_start = $_POST['building_heating_start']; else return;
                    if(isset($_POST['building_heating_end'])) $building_heating_end = $_POST['building_heating_end']; else return;
                    if(isset($_POST['building_theta'])) $building_theta = $_POST['building_theta']; else return;
                    if(isset($_POST['building_comfort_avg'])) $building_comfort_avg = $_POST['building_comfort_avg']; else return;
            	}     
                    
                $stairwell = 0;
                if($building_typology == 1) $stairwell = 0;
                else{
                  	if($building_floors<3) $stairwell = 0;
                   	else  $stairwell = 1;
                }

                $position_A = 0;
                $position_B = 0;
                if($building_position == 0){$position_A = 1; $position_B = 1;}
                else if($building_position == 1){$position_A = 1; $position_B = 1;}
                else if($building_position == 2){$position_A = 1; $position_B = 0;}
                else if($building_position == 3){$position_A = 0; $position_B = 0;}
                else if($building_position == 4){$position_A = 0; $position_B = 1;}

                $building_heating_days = $building_heating_end - $building_heating_start;
                $building_dd = $building_heating_days * ($building_comfort_avg - $building_theta);

                $building_qc = (0.024*($building_dd)*((($building_per_diff)*($building_height_val)*(1-(($p_window)/100))*($u_wall)+$position_B*($building_area)*($u_roof)+ $position_A*(($building_area)*0.7-(($stairwell)*(0.30*(($building_ave_floor)/0.18-1)+2.2)))*($u_floor)*0.5)+ ($delta_u_bridge)*(($building_per_diff)*($building_height_val)+($position_B*$building_area)+$position_A*(($building_area)*0.7-(($stairwell)*(0.30*(($building_ave_floor)/0.18-1)+2.2))))+(($p_window)/100)*($building_per_diff)*($building_height_val)*($u_window))+ (($building_area)*0.7-(($stairwell)*(0.30*(($building_ave_floor)/0.18-1)+2.2))  )*($building_floors)*0.3*0.34*($building_ave_floor));
                $building_qgn = ((($p_window)/100)*($building_per_diff)*($building_height_val)*($building_irradiation)*0.75*0.9+((($building_area)*0.7-(($stairwell)*(0.30*(($building_ave_floor)/0.18-1)+2.2)))*(($building_heating_days)*24)*($building_floors)*4*0.7)/1000);
                $building_gamma = ($building_qgn)/($building_qc);
                $building_eta_c = (1-pow(($building_gamma),-8.1))/(1-pow(($building_gamma),-(9.1)));

                $EPI = ((((($p_window)/100)*($building_per_diff)*($building_height_val)*($building_irradiation)*0.75*0.9+((($building_area)*0.7-(($stairwell)*(0.30*(($building_ave_floor)/0.18-1)+2.2)))*(($building_heating_days)*24)*($building_floors)*4*0.7)/1000)-($building_eta_c)*( 0.024*($building_dd)*((($building_per_diff)*($building_height_val)*(1-(($p_window)/100))*($u_wall)+$position_B*($building_area)*($u_roof)+ $position_A*(($building_area)*0.7-(($stairwell)*(0.30*(($building_ave_floor)/0.18-1)+2.2)))*($u_floor)*0.5)+ ($delta_u_bridge)*(($building_per_diff)*($building_height_val)+($position_B*$building_area)+$position_A*(($building_area)*0.7-(($stairwell)*(0.30*(($building_ave_floor)/0.18-1)+2.2))))+(($p_window)/100)*($building_per_diff)*($building_height_val)*($u_window))+ (($building_area)*0.7-(($stairwell)*(0.30*(($building_ave_floor)/0.18-1)+2.2))  )*($building_floors)*0.3*0.34*($building_ave_floor)))/((($building_area)*0.7-(($stairwell)*(0.30*(($building_ave_floor)/0.18-1)+2.2))  )*($building_floors)))/0.5;

                $EPGL = ($EPI)+((1.162*1.6*((($building_area)*0.7-(($stairwell)*(0.30*(($building_ave_floor)/0.18-1)+2.2))  )*(40-15)*360/1000))/((($building_area)*0.5-(($stairwell)*(0.30*(($building_ave_floor)/0.18-1)+2.2))  )*($building_floors)))/0.5;

                echo $EPGL . "@@" . $EPI;
        	}
           	else{
	           	if($buildinganalysis_edit_mode == 0){

           			$stmt = $SCENARIO_1_DATA->prepare("SELECT u_roof, s_roof, u_wall_1, u_wall_2, u_wall_3, u_wall_4, u_wall_5, u_wall_6, u_wall_7, u_wall_8, u_wall_9, u_floor, u_window, p_window, lambda_material, cooling_start, cooling_end, theta_s FROM u_values_historical, climatic_zones, pilots where climatic_zones.id = :building_climatic_zone AND building_typology = :building_typology AND (:building_contructionyear BETWEEN begin_year AND end_year) AND pilot_id = :building_pilot and pilots.id = :building_pilot");
                    $stmt->bindValue(':building_pilot', $building_pilot, PDO::PARAM_INT);
                    $stmt->bindValue(':building_typology', $building_typology, PDO::PARAM_INT);
                    $stmt->bindValue(':building_contructionyear', $building_contructionyear, PDO::PARAM_INT);
                    $stmt->bindValue(':building_climatic_zone', $building_climatic_zone, PDO::PARAM_INT);
                    $stmt->execute();
	
                    $row = $stmt->fetch(PDO::FETCH_NUM, PDO::FETCH_ORI_NEXT);


                    for($i=0;$i<18;$i++){
                        if($row[$i] == 0) return null;
                    }


                    $u_roof = $row[0];
                    $s_roof = $row[1];
                    $u_wall_1 = $row[2];
                    $u_wall_2 = $row[3];
                    $u_wall_3 = $row[4];
                    $u_wall_4 = $row[5];
                    $u_wall_5 = $row[6];
                    $u_wall_6 = $row[7];
                    $u_wall_7 = $row[8];
                    $u_wall_8 = $row[9];
                    $u_wall_9 = $row[10];
                    $u_floor = $row[11];
                    $u_window = $row[12];
                    $p_window = $row[13];
                    $lambda_material = $row[14];
                    $building_heating_start = $row[15];
                    $building_heating_end = $row[16];
                    $building_theta = $row[17];
                    $building_comfort_avg = 26;
                    
                    switch ($building_floors) {
				    	case 0:
    				    	return;
			    		case 1:
    			    		$u_wall = $u_wall_1;
        					break;
		    			case 2:
    			    		$u_wall = $u_wall_2;
	        				break;
    	    			case 3:
    			    		$u_wall = $u_wall_3;
        					break;
	        			case 4:
    			    		$u_wall = $u_wall_4;
        					break;
	        			case 5:
    			    		$u_wall = $u_wall_5;
        					break;
	        			case 6:
    				    	$u_wall = $u_wall_6;
        					break;
	        			case 7:
    			    		$u_wall = $u_wall_7;
        					break;
	        			case 8:
    				    	$u_wall = $u_wall_8;
        					break;					
	        			default:
    	    				$u_wall = $u_wall_9;
        					break;
						}   
                    $stmt = null;
    	       	}
        	   	else{
					$stmt = $SCENARIO_1_DATA->prepare("SELECT s_roof, lambda_material FROM u_values_historical where building_typology = :building_typology AND (:building_contructionyear BETWEEN begin_year AND end_year) AND pilot_id = :building_pilot");
                    $stmt->bindValue(':building_pilot', $building_pilot, PDO::PARAM_INT);
                    $stmt->bindValue(':building_typology', $building_typology, PDO::PARAM_INT);
                    $stmt->bindValue(':building_contructionyear', $building_contructionyear, PDO::PARAM_INT);
                    $stmt->execute();
	
                    $row = $stmt->fetch(PDO::FETCH_NUM, PDO::FETCH_ORI_NEXT);
                  
                  	$s_roof = $row[0];
                    $lambda_material = $row[1];

                    for($i=0;$i<2;$i++){
                        if($row[$i] == 0) return null;
                    }
                    
                    if(isset($_POST['building_u_roof'])) $u_roof = $_POST['building_u_roof']; else return;
            		if(isset($_POST['building_u_wall'])) $u_wall = $_POST['building_u_wall']; else return;
            		if(isset($_POST['building_u_floor'])) $u_floor = $_POST['building_u_floor']; else return;
            		if(isset($_POST['building_u_window'])) $u_window = $_POST['building_u_window']; else return;
            		if(isset($_POST['building_p_window'])) $p_window = $_POST['building_p_window']; else return;
            		if(isset($_POST['building_heating_start'])) $building_heating_start = $_POST['building_heating_start']; else return;
                    if(isset($_POST['building_heating_end'])) $building_heating_end = $_POST['building_heating_end']; else return;
                    if(isset($_POST['building_theta'])) $building_theta = $_POST['building_theta']; else return;
                    if(isset($_POST['building_comfort_avg'])) $building_comfort_avg = $_POST['building_comfort_avg']; else return;
                    
                   
                    $stmt = null;
            	}

            	if($building_floors<3) $stairwell = 0;
               	else  $stairwell = 1;

               	$building_heating_days = $building_heating_end - $building_heating_start;
                $building_dd = $building_heating_days * ($building_comfort_avg - $building_theta);

                $building_qc = (0.024*($building_dd)*((($building_per_diff)*($building_height_val)*(1-(($p_window)/100))*($u_wall)+($building_area)*($s_roof)*($u_roof)+ (($building_area)*0.7-(($stairwell)*(0.30*(($building_ave_floor)/0.18-1)+2.2))  )*($u_floor)*0.5)+(0.6*(($building_per_diff)*(($building_floors)+1)))+(($p_window)/100)*($building_per_diff)*($building_height_val)*($u_window))+ (($building_area)*0.7-(($stairwell)*(0.30*(($building_ave_floor)/0.18-1)+2.2))  )*($building_floors)*0.3*0.34*($building_ave_floor));
                $building_qgn = ((($p_window)/100)*($building_per_diff)*($building_height_val)*($building_irradiation)*0.75*0.9+((($building_area)*0.7-(($stairwell)*(0.30*(($building_ave_floor)/0.18-1)+2.2))) *(($building_heating_days)*24)*($building_floors)*3)/1000);

                $building_gamma = ($building_qgn)/($building_qc);
                $building_eta_c = (1-pow(($building_gamma),-8.1))/(1-pow(($building_gamma),-(9.1)));

            	$EPI = ((((($p_window)/100)*($building_per_diff)*($building_height_val)*($building_irradiation)*0.75*0.9+((($building_area)*0.7-(($stairwell)*(0.30*(($building_ave_floor)/0.18-1)+2.2))) *(($building_heating_days)*24)*($building_floors)*3)/1000)-($building_eta_c)*(0.024*($building_dd)*((($building_per_diff)*($building_height_val)*(1-(($p_window)/100))*($u_wall)+($building_area)*($s_roof)*($u_roof)+ (($building_area)*0.7-(($stairwell)*(0.30*(($building_ave_floor)/0.18-1)+2.2))  )*($u_floor)*0.5)+(0.6*(($building_per_diff)*(($building_floors)+1)))+(($p_window)/100)*($building_per_diff)*($building_height_val)*($u_window))+ (($building_area)*0.7-(($stairwell)*(0.30*(($building_ave_floor)/0.18-1)+2.2))  )*($building_floors)*0.3*0.34*($building_ave_floor)))/((($building_area)*0.7-(($stairwell)*(0.30*(($building_ave_floor)/0.18-1)+2.2))  )*($building_floors)))/0.5;

        		$EPGL = ($EPI)+((1.162*1.6*((($building_area)*0.7-(($stairwell)*(0.30*(($building_ave_floor)/0.18-1)+2.2))  )*(40-15)*360/1000))/((($building_area)*0.5-(($stairwell)*(0.30*(($building_ave_floor)/0.18-1)+2.2))  )*($building_floors)))/0.5;
        
        		echo $EPGL . "@@" . $EPI;
        	}
        }
        $SCENARIO_1_DATA = null;
	}

?>