class User < ApplicationRecord
  has_many :messages
  has_many :memberships, dependent: :destroy
  has_many :groupchats, :through => :memberships

  devise :database_authenticatable, :registerable, 
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:amazon]

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.name = "#{auth.info.first_name} #{auth.info.last_name}"
      user.uid = auth.uid
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
    end
  end

  def password_required?
    super && self.provider.blank?
  end

  def update_with_password(params, *options)
    if encrypted_password.blank?
      update_attributes(params, *options)
    else
     super
    end
  end

  def has_no_password?
    self.encrypted_password.blank?
  end
end
