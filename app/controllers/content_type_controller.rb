class ContentTypeController < ApplicationController

  $hospital

   #all_loc.json
   def all_loc
   		@locations=ContentType.where({name:"Locations"})[0].contents

   		
        @locations=[{:custom_field_1=>""}]+@locations

   	respond_to do |format|
	      format.html # index.html.erb
	      format.json { render json: @locations }
    end

   end

   def get_location
        $hospital=params["location"].delete(";")

        redirect_to get_address_contentType_index_path
   end

   def get_address 

      @address=ContentType.find_address $hospital
      respond_to do |format|
          
          format.json { render json: [{:address => @address[0]}] }
          format.html
      end
   
   end

  

end
