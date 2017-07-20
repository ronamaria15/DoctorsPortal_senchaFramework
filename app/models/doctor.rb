class Doctor
  include Mongoid::Document
  field :first_name
  field :physician_id
  field :description
  field :title
  field :last_name
  field :middle_initial
  field :suffix
  field :nickname
  field :job_title
  field :gender
  field :date_of_birth
  field :age
  field :mobile_number
  field :pager_number
  field :primary_email
  field :display_generic_phone
  field :phone_for_appointment
  field :practice_years
  field :biography
  field :website_url
  field :clinical_interests
  field :research_interests
  field :publications
  field :office_phone
  field :department
  field :related_subspecialty
  field :primary_hospital_affiliation
  field :related_practices
  field :hospital_affiliations





  def self.find_by_name (name,spec,subspec,loc)
    
      arr=Array.new
      locations=ContentType.locations.first.contents
      arr=locations.select{|u| u['custom_field_1'].match(/#{loc.strip}/i)}.map{|q| q['_id'].to_s}
    #a=ContentType.doctors.first.contents.select{|p| (p['custom_field_1'].match(/\Aree/i) || p['custom_field_3'].match(/\Amath/i))&&p['custom_field_38'].match(/\A/i)&&p['custom_field_37'].match(/\Aneona/i)}
    
      namearr = Array.new
      namearr = name.split(" ")
      spec = spec.delete(";")
      loc = loc.delete(";")

    if name==""
      namearr[0]=""
    end
    if name.index(" ")!=nil
        @doctors=ContentType.doctors.first.contents.select{|p| (p['custom_field_1'].match(/^#{namearr[0].strip}/i) || p['custom_field_3'].match(/^#{namearr[0].strip}/i))&&p['custom_field_38'].match(/#{spec.strip}/i)&&p['custom_field_37'].match(/#{subspec.strip}/i)&&((arr.include?p['custom_field_33'].to_s)||(arr.include?p['custom_field_34'].to_s)||(arr.include?p['custom_field_35'].to_s))}
        @doctors += ContentType.doctors.first.contents.select{|p| (p['custom_field_1'].match(/^#{namearr[1].strip}/i) || p['custom_field_3'].match(/^#{namearr[1].strip}/i))&&p['custom_field_38'].match(/#{spec.strip}/i)&&p['custom_field_37'].match(/#{subspec.strip}/i)&&((arr.include?p['custom_field_33'].to_s)||(arr.include?p['custom_field_34'].to_s)||(arr.include?p['custom_field_35'].to_s))}
        @doctors.uniq!
        @doctors
    else
        @doctors = ContentType.doctors.first.contents.select{|p| (p['custom_field_1'].match(/^#{namearr[0].strip}/i) || p['custom_field_3'].match(/^#{namearr[0].strip}/i))&&p['custom_field_38'].match(/#{spec.strip}/i)&&p['custom_field_37'].match(/#{subspec.strip}/i)&&((arr.include?p['custom_field_33'].to_s)||(arr.include?p['custom_field_34'].to_s)||(arr.include?p['custom_field_35'].to_s))}
        @doctors
    end


  end

 def self.find_by_location (name,spec,subspec,loc)

    arr=Array.new
    locations=ContentType.locations.first.contents

    if name!=""
      arr=locations.select{|u| u['custom_field_1'].match(/#{name}/i)}.map{|q| q['_id'].to_s}
    end

    if loc!=""
      arr+=locations.select{|u| u['custom_field_1'].match(/#{loc.strip}/i)}.map{|q| q['_id'].to_s}
    end
    
    if !arr.any?
      @doctors=ContentType.doctors.first.contents.select{|p|  p['custom_field_38'].match(/#{spec.strip}/i)&&p['custom_field_37'].match(/#{subspec.strip}/i)}
      @doctors
    else
    #@doctors=ContentType.doctors.first.contents.select{|p|  ((arr.include?p['custom_field_33'].to_s)|| (arr.include?p['custom_field_33'].to_s)||(arr.include?p['custom_field_33'].to_s))&&p['custom_field_38'].match(/#{spec}/i)&&p['custom_field_37'].match(/#{subspec}/i)}
      @doctors=ContentType.doctors.first.contents.select{|p|  (arr.include?p['custom_field_33'].to_s)&&p['custom_field_38'].match(/#{spec.strip}/i)&&p['custom_field_37'].match(/#{subspec.strip}/i)}
      @doctors
    end
  end

def self.find_by_spec (name,spec,subspec,loc)
      arr=Array.new
      locations=ContentType.locations.first.contents
      arr=locations.select{|u| u['custom_field_1'].match(/#{loc}/i)}.map{|q| q['_id'].to_s}
  
      @doctors=Array.new

      if name!=""
            @doctors+=ContentType.doctors.first.contents.select{|p| p['custom_field_38'].match(/#{name.strip}/i) &&p['custom_field_37'].match(/#{subspec.strip}/i)&&((arr.include?p['custom_field_33'].to_s)||(arr.include?p['custom_field_34'].to_s)||(arr.include?p['custom_field_35'].to_s))}
      end      
      if spec!=""||subspec!=""
            @doctors+=ContentType.doctors.first.contents.select{|p| p['custom_field_38'].match(/#{spec.strip}/i) &&p['custom_field_37'].match(/#{subspec.strip}/i)&&((arr.include?p['custom_field_33'].to_s)||(arr.include?p['custom_field_34'].to_s)||(arr.include?p['custom_field_35'].to_s))}
      end
      @doctors
    
end




  def self.subspecialty
        @sub_specialty = Array.new
        @subspecialties = Doctor.all.distinct(:related_subspecialty)
        @subspecialties.each do |subspecialty|
            temp = subspecialty.split(";")
            temp.each{|val| @sub_specialty<<val.split(",")}
            @sub_specialty.flatten
            @sub_specialty.uniq!
      end 
      @sub_specialty.collect! { |item| {:related_subspecialty => item} }
      @sub_specialty = [{:related_subspecialty=>""}]+@sub_specialty
      @sub_specialty
  end

  def self.specialty
          @spec=Doctor.all.distinct(:department)
          @spec.collect!{|r| r.delete(";")}
          @spec
  end

end
