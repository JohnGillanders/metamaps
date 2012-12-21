class MapsController < ApplicationController
  
  before_filter :require_user, only: [:new, :create, :edit, :update, :savelayout]
    
  respond_to :html, :js, :json
  
  autocomplete :map, :name, :full => true, :extra_data => [:user_id]
  
  # GET /maps
  # or GET /users/:user_id/maps
  def index
    
    @current = current_user
    
    if params[:user_id]
      @user = User.find(params[:user_id])
      @maps = Map.visibleToUser(@current, @user)
    elsif 
      @maps = Map.visibleToUser(@current, nil)
    end
    
	  respond_with(@maps,@user)
  end
  
  # GET maps/new
  def new
  	@map = Map.new
    @user = current_user
    
    respond_with(@map)
  end
  
  # GET maps/:id
  def show
  	
	  @current = current_user
	  @map = Map.find(params[:id]).authorize_to_show(@current)
	
	  if not @map
	    redirect_to root_url and return
	  end
		
	  @mapjson = @map.self_as_json(@current).html_safe
	
	  respond_to do |format|
      format.html { respond_with(@map, @user) }
      format.json { respond_with(@mapjson) }
    end
  end
  
  # POST maps
  def create
    
    @user = current_user
	  @map = Map.create(params[:map])
    @map.user = @user    
	  @map.arranged = false
	  @map.save   
    
    respond_to do |format|
      format.html { respond_with(@user, location: map_path(@map)) }
    end
  end
  
  # GET maps/:id/edit
  def edit
	  @current = current_user
	  @map = Map.find(params[:id]).authorize_to_edit(@current)
	
	  if not @map
	    redirect_to root_url and return
	  end
	
	  @outitems = @map.items.order("name ASC").delete_if{|item| not item.authorize_to_view(@current)}
  
	  respond_with(@user, @map, @outitems)
  end
  
  # PUT maps/:id
  def update
	  @map = Map.find(params[:id])
    
	  @map.attributes = params[:map]
	  @map.save
	
	  if params[:outitems]
		  @outitems = params[:outitems]
		  @outitems.each do |item|
			  @mapping = Mapping.where("map_id = ? AND item_id = ?", @map.id, item).first
			  @mapping.delete
		  end
	  end
	
    respond_with(@user, location: map_path(@map)) do |format|
    end
  end
  
  # PUT maps/:id/savelayout
  def savelayout
	  @map = Map.find(params[:id])
	
	  if params[:map][:coordinates]
		  @all = params[:map][:coordinates]
  		@all = @all.split(',')
		  @all.each do |item|
			  item = item.split('/')
			  @mapping = Mapping.find(item[0])
			  @mapping.xloc = item[1]
			  @mapping.yloc = item[2]
			  @mapping.save
		  end
		  @map.arranged = true
		  @map.save
	  end	
  end
  
  # DELETE /users/:user_id/maps/:id
  def destroy
	  @map = Map.find(params[:id])
	
	  @mappings = @map.mappings
	
	  @mappings.each do |mapping| 
		  mapping.delete
	  end
	
	  @map.delete
	
	  respond_to do |format|
        format.js
    end
  end
end
