class DoctorsController < ApplicationController
  # GET /doctors
  # GET /doctors.json
  $gotvalue
  $gottype
  $gotloc
  $gotspec
  $gotsubspec


  def index
    
      @doctors=Doctor.all
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @doctors }
    end
  end

  # GET /doctors/1
  # GET /doctors/1.json
  def show
    @doctor = Doctor.find(params[:id])
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @doctor }
    end
  end

  # GET /doctors/new
  # GET /doctors/new.json
  def new
    @doctor = Doctor.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @doctor }
    end
  end

  # GET /doctors/1/edit
  def edit
    @doctor = Doctor.find(params[:id])
  end

  # POST /doctors
  # POST /doctors.json
  def create
    @doctor = Doctor.new(params[:doctor])

    respond_to do |format|
      if @doctor.save
        format.html { redirect_to @doctor, notice: 'Doctor was successfully created.' }
        format.json { render json: @doctor, status: :created, location: @doctor }
      else
        format.html { render action: "new" }
        format.json { render json: @doctor.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /doctors/1
  # PUT /doctors/1.json
  def update
    @doctor = Doctor.find(params[:id])

    respond_to do |format|
      if @doctor.update_attributes(params[:doctor])
        format.html { redirect_to @doctor, notice: 'Doctor was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @doctor.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /doctors/1
  # DELETE /doctors/1.json
  def destroy
    @doctor = Doctor.find(params[:id])
    @doctor.destroy

    respond_to do |format|
      format.html { redirect_to doctors_url }
      format.json { head :no_content }
    end
  end
   
  def get_form_values
    $gotvalue=params["name"]
    $gottype=params["search_type"]
    $gotloc=params["location"]
    $gotspec=params["specialty"]
    $gotsubspec=params["subspecialty"]
    redirect_to search_by_name_doctors_path
  end

  def search_by_name
    #get_form_values
    
    #gotvalue=params[:query]
   
    #puts "#{gotvalue} =========================== ",gotvalue.class
    
       name=$gotvalue
       if name.strip! ==""
            name="ar"
       end
       spec=$gotspec
       subspec=$gotsubspec
       loc=$gotloc
       if $gottype=="name"
        @results=Doctor.find_by_name(name,spec,subspec,loc)

       # @results+=Doctor.find_by_location($gotloc)
       # @results+=Doctor.find_by_spec($gotspec)



      elsif $gottype=="location"
        @results=Doctor.find_by_location(name,spec,subspec,loc)




      else
        @results=Doctor.find_by_spec(name,spec,subspec,loc)




      end


=begin      i=0
        arrayofhash=Array.new
        @results.each do |doc|
            s=doc.primary_hospital_affiliation.delete(";")
          @address=ContentType.find_address s
#@address=["tt"]
#training="kk"
#certification="pp"

          edu_detail=ContentType.find_edu doc.primary_email
          #certification=ContentType.find_certification doc.primary_email
           
            arrayofhash[i] = {'first_name' =>  doc.first_name ,'last_name'=> doc.last_name,'primary_hospital_affiliation'=>doc.primary_hospital_affiliation ,'department' => doc.department,'office_phone'=>doc.office_phone ,'related_subspecialty'=>doc.related_subspecialty,'related_practices'=>doc.related_practices,'hospital_affiliations'=>doc.hospital_affiliations, 'address'=>@address[0] ,'training'=>edu_detail['training'],'certification'=>edu_detail['certification']}  
            i=i+1
        end

        respond_to do |format|
          format.json { render json: arrayofhash }
        end
=end







 i=0
        arrayofhash=Array.new
        @results.each do |doc|
           # s=doc.primary_hospital_affiliation.delete(";")
          #@address=ContentType.find_address s
#@address=["tt"]
#training="kk"
#certification="pp"

          #edu_detail=ContentType.find_edu doc.primary_email
          #certification=ContentType.find_certification doc.primary_email
            address=ContentType.find_location doc['custom_field_33'].to_s
            arrayofhash[i] = {'first_name' =>  doc['custom_field_1'] ,'last_name'=> doc['custom_field_3'],'primary_hospital_affiliation'=>address.first['custom_field_1'] ,'department' => doc['custom_field_38'],'office_phone'=>doc['custom_field_22'] ,'related_subspecialty'=>doc['custom_field_37'],'related_practices'=>"doc.related_practices",'hospital_affiliations'=>"doc.hospital_", 'address'=>address.first['custom_field_4'] ,'training'=>doc['custom_field_40'],'certification'=>doc['custom_field_40']}  
            i=i+1
        end

        respond_to do |format|
          format.json { render json: arrayofhash }
        end









  end



  def specialty
      @spec=Doctor.specialty
      
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @spec.collect { |item| {:department => item} } }
    end
  end

  def subspecialty

    @sub_specialty=Doctor.subspecialty
    
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @sub_specialty}
    end
  end

end
