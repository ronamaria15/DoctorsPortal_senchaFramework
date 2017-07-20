class ContentType
  include Mongoid::Document


  
  ## fields ##
  field :name
  field :description
  field :slug
  field :order_by
  field :order_direction, :default => 'asc'
  field :highlighted_field_name
  field :group_by_field_name
  field :api_enabled, :type => Boolean, :default => false
  field :api_accounts, :type => Array
  field :address

 
  
 scope :doctors, where(:slug => 'doctors')
 scope :locations, where(:slug => 'locations')
 scope :departments, where(:slug => 'departments')
 scope :divisions, where(:slug => 'divisions')
 

def self.find_location loc_id
  if loc_id != ""
       locations=ContentType.locations.first.contents
       loc_add=locations.select{|u| u['_id'].to_s==loc_id}
       loc_add
  else
       loc_add=[{"custom_field_4"=>""},{"custom_field_1"=>""}]    
       loc_add
  end
end


def self.find_address name
  a=ContentType.where({name:"Locations"}).only('contents')[0].contents.select{|x| x['custom_field_1']==name}.map{|x| x['custom_field_4']}
end



def self.find_edu email
  #ContentType.where({name:"Doctors"})[0].contents.each{|record| training_rec=record["custom_field_40"]  if record["custom_field_12"]==email}
  #a=ContentType.where({name:"Doctors"}).only('contents')[0].contents.select{|x| x['custom_field_12']==email}.map{|x| x['custom_field_40']}


  details=Hash.new
  ContentType.where({name:"Doctors"}).only('contents')[0].contents.select{|x| x['custom_field_12']==email}.map{|x| details['certification'],details['training']=x['custom_field_40'],x['custom_field_39'] }
  details
end

#def self.find_certification email
  #certification_rec=String.new
  #ContentType.where({name:"Doctors"})[0].contents.each{|record| certification_rec=record["custom_field_39"]  if record["custom_field_12"]==email}
  #certification_rec  
 #   a=ContentType.where({name:"Doctors"}).only('contents')[0].contents.select{|x| x['custom_field_12']==email}.map{|x| x['custom_field_39']}

#end

end




 
